
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { transactionAPI } from '../services/api';
import { Loader, Search, Filter, ArrowUpDown } from 'lucide-react';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Transaction {
  id: string;
  merchantId: string;
  network: string;
  fee: string;
  confirmationTime: string;
  decisionMethod: string;
  timestamp: string;
  amount: string;
  status: string;
}

type SortKey = 'timestamp' | 'fee' | 'confirmationTime';
type SortDirection = 'asc' | 'desc';

const TransactionsPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('timestamp');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [networkFilter, setNetworkFilter] = useState<string>('all');

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        // In a real app, you would use the actual API
        const response = await transactionAPI.getTransactions();
        setTransactions(response);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        toast.error('Failed to fetch transactions');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleSortChange = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const filteredAndSortedTransactions = transactions
    .filter((tx) => {
      const matchesSearch = 
        tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.network.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.merchantId.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesNetwork = networkFilter === 'all' || tx.network === networkFilter;
      
      return matchesSearch && matchesNetwork;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      if (sortKey === 'timestamp') {
        comparison = new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      } else if (sortKey === 'fee') {
        const aFee = parseFloat(a.fee.split(' ')[0]);
        const bFee = parseFloat(b.fee.split(' ')[0]);
        comparison = aFee - bFee;
      } else if (sortKey === 'confirmationTime') {
        const aTime = parseInt(a.confirmationTime.split(' ')[0]);
        const bTime = parseInt(b.confirmationTime.split(' ')[0]);
        comparison = aTime - bTime;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });

  const uniqueNetworks = Array.from(new Set(transactions.map((tx) => tx.network)));

  return (
    <div className="space-y-6">
      <div className="space-y-0.5">
        <h2 className="text-3xl font-bold tracking-tight">Transaction Log</h2>
        <p className="text-muted-foreground">
          View and analyze your payment transaction history.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            Browse through your payment routing history.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={networkFilter} onValueChange={setNetworkFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Filter by network" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Networks</SelectItem>
                  {uniqueNetworks.map((network) => (
                    <SelectItem key={network} value={network}>
                      {network}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoading ? (
            <div className="flex h-[300px] items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <Loader className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Loading transactions...</p>
              </div>
            </div>
          ) : (
            <div className="overflow-hidden rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Network</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="-ml-3 h-8 data-[state=open]:bg-accent"
                        onClick={() => handleSortChange('fee')}
                      >
                        Fee
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="-ml-3 h-8 data-[state=open]:bg-accent"
                        onClick={() => handleSortChange('confirmationTime')}
                      >
                        Confirmation
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="-ml-3 h-8 data-[state=open]:bg-accent"
                        onClick={() => handleSortChange('timestamp')}
                      >
                        Time
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedTransactions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center">
                        No transactions found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredAndSortedTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-mono text-xs">
                          {transaction.id.substring(0, 6)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                            {transaction.network}
                          </div>
                        </TableCell>
                        <TableCell>{transaction.amount}</TableCell>
                        <TableCell>{transaction.fee}</TableCell>
                        <TableCell>{transaction.confirmationTime}</TableCell>
                        <TableCell>
                          <Badge variant={transaction.decisionMethod === 'hybrid' ? 'outline' : 'secondary'}>
                            {transaction.decisionMethod}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(transaction.timestamp)}</TableCell>
                        <TableCell className="text-right">
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            {transaction.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionsPage;

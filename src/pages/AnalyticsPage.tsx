
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, PieChart, Pie, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Loader } from 'lucide-react';

// Sample data for charts
const networkUsageData = [
  { name: 'Ethereum Mainnet', value: 35, color: '#3b82f6' },
  { name: 'Polygon', value: 25, color: '#8b5cf6' },
  { name: 'Optimism', value: 20, color: '#ec4899' },
  { name: 'Arbitrum', value: 15, color: '#f97316' },
  { name: 'Base', value: 5, color: '#10b981' },
];

const decisionMethodData = [
  { name: 'Heuristic', value: 60, color: '#3b82f6' },
  { name: 'Hybrid/AI', value: 40, color: '#8b5cf6' },
];

const gasUsageData = [
  { name: 'Mon', eth: 0.0032, poly: 0.0012, opt: 0.0008, arb: 0.0015 },
  { name: 'Tue', eth: 0.0028, poly: 0.0014, opt: 0.0010, arb: 0.0018 },
  { name: 'Wed', eth: 0.0034, poly: 0.0015, opt: 0.0007, arb: 0.0012 },
  { name: 'Thu', eth: 0.0030, poly: 0.0018, opt: 0.0009, arb: 0.0014 },
  { name: 'Fri', eth: 0.0038, poly: 0.0020, opt: 0.0011, arb: 0.0016 },
  { name: 'Sat', eth: 0.0025, poly: 0.0010, opt: 0.0006, arb: 0.0010 },
  { name: 'Sun', eth: 0.0020, poly: 0.0008, opt: 0.0005, arb: 0.0008 },
];

const confirmationTimeData = [
  { name: 'Ethereum Mainnet', time: 15 },
  { name: 'Polygon', time: 8 },
  { name: 'Optimism', time: 3 },
  { name: 'Arbitrum', time: 5 },
  { name: 'Base', time: 4 },
];

const AnalyticsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-0.5">
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground">
          View insights about your payment routing activity.
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="w-full max-w-md">
          <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
          <TabsTrigger value="networks" className="flex-1">Networks</TabsTrigger>
          <TabsTrigger value="performance" className="flex-1">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Network Usage</CardTitle>
                <CardDescription>
                  Distribution of transactions across networks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={networkUsageData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        labelLine={false}
                      >
                        {networkUsageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Decision Methods</CardTitle>
                <CardDescription>
                  Heuristic vs AI-assisted routing decisions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={decisionMethodData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        labelLine={false}
                      >
                        {decisionMethodData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="networks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gas Usage by Network</CardTitle>
              <CardDescription>
                Weekly gas consumption across different networks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={gasUsageData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value} ETH`} />
                    <Legend />
                    <Bar dataKey="eth" name="Ethereum" fill="#3b82f6" />
                    <Bar dataKey="poly" name="Polygon" fill="#8b5cf6" />
                    <Bar dataKey="opt" name="Optimism" fill="#ec4899" />
                    <Bar dataKey="arb" name="Arbitrum" fill="#f97316" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Average Confirmation Time</CardTitle>
              <CardDescription>
                Average confirmation time in seconds by network
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={confirmationTimeData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip formatter={(value) => `${value} seconds`} />
                    <Bar dataKey="time" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsPage;

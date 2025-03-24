
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { routingAPI } from '../services/api';
import { Loader, BarChart3, ArrowRight, Zap, Clock, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

interface RoutingPreferences {
  maxFee: number;
  useAiFallback: boolean;
  minConfirmationTime: number;
  preferredNetworks: string[];
}

interface RoutingDecision {
  selectedNetwork: string;
  decisionMethod: 'heuristic' | 'hybrid';
  aiRecommendation?: string;
  stats: {
    gasPrice: string;
    confirmationTime: string;
    congestion: string;
  };
}

const initialPreferences: RoutingPreferences = {
  maxFee: 5,
  useAiFallback: true,
  minConfirmationTime: 30,
  preferredNetworks: ['Ethereum', 'Polygon', 'Optimism', 'Arbitrum'],
};

const DashboardPage: React.FC = () => {
  const [preferences, setPreferences] = useState<RoutingPreferences>(initialPreferences);
  const [decision, setDecision] = useState<RoutingDecision | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('quick');

  const handleQuickRoute = async () => {
    setIsLoading(true);
    try {
      // In a real app, you would use the actual response from the API
      // const response = await routingAPI.getDecision(preferences);
      // setDecision(response);
      
      // For demo, simulate API call with timeout
      setTimeout(() => {
        setDecision({
          selectedNetwork: 'Optimism',
          decisionMethod: 'hybrid',
          aiRecommendation: 'Optimism',
          stats: {
            gasPrice: '0.0012 ETH',
            confirmationTime: '3 seconds',
            congestion: 'Low',
          },
        });
        setIsLoading(false);
        toast.success('Routing decision received');
      }, 1500);
    } catch (error) {
      console.error('Error getting routing decision:', error);
      toast.error('Failed to get routing decision');
      setIsLoading(false);
    }
  };

  const handleAdvancedRoute = async () => {
    setIsLoading(true);
    try {
      // Simulate API call with timeout
      setTimeout(() => {
        setDecision({
          selectedNetwork: preferences.preferredNetworks[0],
          decisionMethod: preferences.useAiFallback ? 'hybrid' : 'heuristic',
          aiRecommendation: preferences.useAiFallback ? preferences.preferredNetworks[0] : undefined,
          stats: {
            gasPrice: '0.003 ETH',
            confirmationTime: '12 seconds',
            congestion: 'Medium',
          },
        });
        setIsLoading(false);
        toast.success('Advanced routing decision received');
      }, 2000);
    } catch (error) {
      console.error('Error getting routing decision:', error);
      toast.error('Failed to get routing decision');
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-0.5">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Make routing decisions for your crypto payments.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
              <span className="text-2xl font-bold">128</span>
            </div>
            <p className="text-xs text-muted-foreground">+14% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Fee</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-muted-foreground" />
              <span className="text-2xl font-bold">0.0021 ETH</span>
            </div>
            <p className="text-xs text-muted-foreground">-2.5% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Confirmation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-2xl font-bold">8.3s</span>
            </div>
            <p className="text-xs text-muted-foreground">4.8s faster than target</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Routing Decision</CardTitle>
              <CardDescription>
                Configure your preferences for routing decisions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="quick" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4 w-full">
                  <TabsTrigger value="quick" className="flex-1">Quick Route</TabsTrigger>
                  <TabsTrigger value="advanced" className="flex-1">Advanced Options</TabsTrigger>
                </TabsList>
                <TabsContent value="quick" className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Get an instant routing decision using our default parameters.
                    </p>
                    <Button 
                      onClick={handleQuickRoute} 
                      disabled={isLoading}
                      className="w-full"
                    >
                      {isLoading ? (
                        <>
                          <Loader className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Get Quick Route
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="advanced" className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="max-fee">Maximum Fee (in %)</Label>
                      <div className="flex items-center gap-4">
                        <Slider
                          id="max-fee"
                          value={[preferences.maxFee]}
                          min={0}
                          max={10}
                          step={0.1}
                          onValueChange={(value) => 
                            setPreferences({ ...preferences, maxFee: value[0] })
                          }
                          className="flex-1"
                        />
                        <span className="w-12 text-right text-sm font-medium">
                          {preferences.maxFee}%
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="min-confirmation">Min Confirmation Time (seconds)</Label>
                      <div className="flex items-center gap-4">
                        <Slider
                          id="min-confirmation"
                          value={[preferences.minConfirmationTime]}
                          min={1}
                          max={60}
                          step={1}
                          onValueChange={(value) => 
                            setPreferences({ ...preferences, minConfirmationTime: value[0] })
                          }
                          className="flex-1"
                        />
                        <span className="w-12 text-right text-sm font-medium">
                          {preferences.minConfirmationTime}s
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="ai-fallback" className="cursor-pointer">
                        Use AI Fallback
                      </Label>
                      <Switch
                        id="ai-fallback"
                        checked={preferences.useAiFallback}
                        onCheckedChange={(checked) => 
                          setPreferences({ ...preferences, useAiFallback: checked })
                        }
                      />
                    </div>

                    <Button 
                      onClick={handleAdvancedRoute} 
                      disabled={isLoading}
                      className="w-full"
                    >
                      {isLoading ? (
                        <>
                          <Loader className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Submit Routing Decision
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className={`h-full transition-opacity duration-300 ${decision ? 'opacity-100' : 'opacity-50'}`}>
            <CardHeader>
              <CardTitle>Decision Result</CardTitle>
              <CardDescription>
                Your routing decision details will appear here
              </CardDescription>
            </CardHeader>
            <CardContent>
              {decision ? (
                <div className="space-y-6">
                  <div className="rounded-lg bg-primary/10 p-4">
                    <div className="mb-2 text-sm font-medium text-primary">
                      Selected Network
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">{decision.selectedNetwork}</div>
                      <div className="rounded-full bg-primary/20 px-2.5 py-0.5 text-xs font-medium text-primary">
                        {decision.decisionMethod === 'hybrid' ? 'AI-Assisted' : 'Heuristic'}
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">Gas Price</div>
                      <div className="font-medium">{decision.stats.gasPrice}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">Confirmation</div>
                      <div className="font-medium">{decision.stats.confirmationTime}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">Congestion</div>
                      <div className="font-medium">{decision.stats.congestion}</div>
                    </div>
                  </div>

                  {decision.aiRecommendation && (
                    <div className="rounded-md border border-border bg-accent/50 p-3">
                      <div className="text-sm font-medium">AI Recommendation</div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        Our AI system recommended using {decision.aiRecommendation} for this transaction based on current network conditions and your preferences.
                      </div>
                    </div>
                  )}

                  <Button variant="outline" className="w-full" size="sm">
                    View Transaction Details
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <div className="flex h-[280px] flex-col items-center justify-center text-center">
                  <div className="rounded-full bg-muted p-3">
                    <ArrowRight className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">No Decision Yet</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Submit a routing request to see the decision result here.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

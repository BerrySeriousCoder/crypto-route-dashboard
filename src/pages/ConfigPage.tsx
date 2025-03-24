
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { configAPI } from '../services/api';
import { Loader, Save } from 'lucide-react';
import { toast } from 'sonner';

interface ConfigSettings {
  fallbackNetwork: string;
  apiKey: string;
  webhookUrl: string;
  enableAi: boolean;
  enableAutoRoute: boolean;
  maxGasPrice: number;
  notificationEmail: string;
  networks: {
    [key: string]: {
      enabled: boolean;
      priority: number;
    };
  };
}

const initialConfig: ConfigSettings = {
  fallbackNetwork: 'ethereum',
  apiKey: 'pk_test_51HZS',
  webhookUrl: 'https://example.com/webhooks/crypto',
  enableAi: true,
  enableAutoRoute: true,
  maxGasPrice: 100,
  notificationEmail: '',
  networks: {
    ethereum: { enabled: true, priority: 1 },
    polygon: { enabled: true, priority: 2 },
    optimism: { enabled: true, priority: 3 },
    arbitrum: { enabled: true, priority: 4 },
  },
};

const ConfigPage: React.FC = () => {
  const [config, setConfig] = useState<ConfigSettings>(initialConfig);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchConfig = async () => {
      setIsLoading(true);
      try {
        // In a real app, you would use the actual API
        // const response = await configAPI.getConfig();
        // setConfig(response);
        
        // Simulate API call
        setTimeout(() => {
          setConfig(initialConfig);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching config:', error);
        toast.error('Failed to fetch configuration');
        setIsLoading(false);
      }
    };

    fetchConfig();
  }, []);

  const handleNetworkChange = (network: string, field: 'enabled' | 'priority', value: boolean | number) => {
    setConfig({
      ...config,
      networks: {
        ...config.networks,
        [network]: {
          ...config.networks[network],
          [field]: value,
        },
      },
    });
  };

  const handleSaveConfig = async () => {
    setIsSaving(true);
    try {
      // In a real app, you would use the actual API
      // await configAPI.updateConfig(config);
      
      // Simulate API call
      setTimeout(() => {
        toast.success('Configuration saved successfully');
        setIsSaving(false);
      }, 1500);
    } catch (error) {
      console.error('Error saving config:', error);
      toast.error('Failed to save configuration');
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading configuration...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-0.5">
        <h2 className="text-3xl font-bold tracking-tight">Configuration</h2>
        <p className="text-muted-foreground">
          Manage your crypto payment routing settings.
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="w-full max-w-md">
          <TabsTrigger value="general" className="flex-1">General</TabsTrigger>
          <TabsTrigger value="networks" className="flex-1">Networks</TabsTrigger>
          <TabsTrigger value="api" className="flex-1">API & Webhooks</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure the basic behavior of the crypto payment router.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fallback-network">Fallback Network</Label>
                <Select 
                  value={config.fallbackNetwork}
                  onValueChange={(value) => setConfig({ ...config, fallbackNetwork: value })}
                >
                  <SelectTrigger id="fallback-network">
                    <SelectValue placeholder="Select a network" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ethereum">Ethereum</SelectItem>
                    <SelectItem value="polygon">Polygon</SelectItem>
                    <SelectItem value="optimism">Optimism</SelectItem>
                    <SelectItem value="arbitrum">Arbitrum</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  This network will be used if no suitable route is found.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="max-gas-price">Maximum Gas Price (GWEI)</Label>
                <Input
                  id="max-gas-price"
                  type="number"
                  value={config.maxGasPrice}
                  onChange={(e) => setConfig({ ...config, maxGasPrice: Number(e.target.value) })}
                />
                <p className="text-xs text-muted-foreground">
                  The maximum gas price to use for transactions.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notification-email">Notification Email</Label>
                <Input
                  id="notification-email"
                  type="email"
                  placeholder="alerts@yourcompany.com"
                  value={config.notificationEmail}
                  onChange={(e) => setConfig({ ...config, notificationEmail: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  Email address for system notifications and alerts.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="enable-ai" className="cursor-pointer">
                    Enable AI Routing
                  </Label>
                  <Switch
                    id="enable-ai"
                    checked={config.enableAi}
                    onCheckedChange={(checked) => setConfig({ ...config, enableAi: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="enable-auto-route" className="cursor-pointer">
                    Enable Automatic Routing
                  </Label>
                  <Switch
                    id="enable-auto-route"
                    checked={config.enableAutoRoute}
                    onCheckedChange={(checked) => setConfig({ ...config, enableAutoRoute: checked })}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveConfig} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="networks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Network Configuration</CardTitle>
              <CardDescription>
                Enable and prioritize the networks used for payment routing.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(config.networks).map(([network, settings]) => (
                <div key={network} className="flex items-center justify-between border-b pb-3 pt-3 last:border-0">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium capitalize">{network}</div>
                    <div className="text-xs text-muted-foreground">
                      Priority: {settings.priority}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`${network}-priority`} className="text-xs">Priority</Label>
                      <Select 
                        value={settings.priority.toString()}
                        onValueChange={(value) => handleNetworkChange(network, 'priority', Number(value))}
                      >
                        <SelectTrigger id={`${network}-priority`} className="h-8 w-20">
                          <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Switch
                      id={`${network}-enabled`}
                      checked={settings.enabled}
                      onCheckedChange={(checked) => handleNetworkChange(network, 'enabled', checked)}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveConfig} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Network Settings
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API & Webhook Settings</CardTitle>
              <CardDescription>
                Configure API credentials and webhook endpoints.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <Input
                  id="api-key"
                  value={config.apiKey}
                  onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  Your private API key for authentication.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="webhook-url">Webhook URL</Label>
                <Input
                  id="webhook-url"
                  placeholder="https://yourapp.com/webhooks/crypto"
                  value={config.webhookUrl}
                  onChange={(e) => setConfig({ ...config, webhookUrl: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  URL where payment notifications will be sent.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveConfig} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save API Settings
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConfigPage;

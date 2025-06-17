import { useTable, useNavigation, useDelete } from "@refinedev/core";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Eye, Edit, Trash2, Plus, Calendar, DollarSign, MapPin } from "lucide-react";

export const GoogleAdsCampaignList = () => {
  const { tableQueryResult, current, setCurrent, pageSize, setPageSize, filters, setFilters } = useTable();
  const { create, edit, show } = useNavigation();
  const { mutate: deleteCampaign } = useDelete();

  const { data, isLoading, isError } = tableQueryResult;

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (isError) return <div className="p-6 text-red-500">Error loading campaigns</div>;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'paused': return 'secondary';
      case 'draft': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Google Ads Campaigns</h1>
          <p className="text-muted-foreground">Manage your Google Ads campaigns</p>
        </div>
        <Button onClick={() => create("google_ads_campaigns")}>
          <Plus className="w-4 h-4 mr-2" />
          Create New Campaign
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Input 
          placeholder="Search campaigns..." 
          className="max-w-sm"
          onChange={(e) => {
            setFilters([
              {
                field: "name",
                operator: "contains",
                value: e.target.value,
              },
            ]);
          }}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.data?.map((campaign: any) => (
          <Card key={campaign.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex gap-2">
                  <Badge variant={getStatusColor(campaign.status)}>
                    {campaign.status}
                  </Badge>
                  <Badge variant="outline">
                    {campaign.campaign_type}
                  </Badge>
                </div>
                <span className="text-sm text-muted-foreground">
                  #{campaign.id.slice(0, 8)}
                </span>
              </div>
              <CardTitle className="text-lg font-semibold leading-tight">
                {campaign.name}
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3">
                {campaign.budget_daily && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      Daily Budget
                    </span>
                    <span className="text-sm">${campaign.budget_daily}</span>
                  </div>
                )}
                
                {campaign.budget_total && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Total Budget</span>
                    <span className="text-sm">${campaign.budget_total}</span>
                  </div>
                )}

                {(campaign.start_date || campaign.end_date) && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {campaign.start_date && new Date(campaign.start_date).toLocaleDateString()}
                    {campaign.start_date && campaign.end_date && " - "}
                    {campaign.end_date && new Date(campaign.end_date).toLocaleDateString()}
                  </div>
                )}

                {campaign.target_locations && campaign.target_locations.length > 0 && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <div className="flex flex-wrap gap-1">
                      {campaign.target_locations.slice(0, 2).map((location: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {location}
                        </Badge>
                      ))}
                      {campaign.target_locations.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{campaign.target_locations.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {campaign.keywords_final && campaign.keywords_final.length > 0 && (
                  <div className="text-xs text-muted-foreground">
                    {campaign.keywords_final.length} keywords
                  </div>
                )}
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => show("google_ads_campaigns", campaign.id)}
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => edit("google_ads_campaigns", campaign.id)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => {
                  if (confirm("Are you sure you want to delete this campaign?")) {
                    deleteCampaign({
                      resource: "google_ads_campaigns",
                      id: campaign.id,
                    });
                  }
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {((current - 1) * pageSize) + 1} to {Math.min(current * pageSize, data?.total || 0)} of {data?.total || 0} campaigns
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setCurrent(current - 1)}
            disabled={current === 1}
          >
            Previous
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setCurrent(current + 1)}
            disabled={current * pageSize >= (data?.total || 0)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
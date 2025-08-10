"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Eye, Download, Search, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  useRealtimeJobApplications,
  updateApplicationStatus,
  type JobApplication,
} from "@/lib/supabase";

export default function AdminApplicationsPage() {
  const { applications, loading } = useRealtimeJobApplications();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedApplication, setSelectedApplication] =
    useState<JobApplication | null>(null);
  const { toast } = useToast();

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.job_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "pending":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "interview":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const handleStatusChange = async (
    applicationId: number,
    newStatus: string
  ) => {
    const { error } = await updateApplicationStatus(applicationId, newStatus);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update application status",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Status Updated",
        description: `Application status changed to ${newStatus}`,
      });
    }
  };

  const handleDownloadCV = (applicantName: string) => {
    toast({
      title: "CV Downloaded",
      description: `${applicantName}'s CV has been downloaded`,
    });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-96" />
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <Skeleton className="h-5 w-32 mb-1" />
                        <Skeleton className="h-4 w-24 mb-1" />
                        <Skeleton className="h-4 w-36" />
                      </div>
                      <div>
                        <Skeleton className="h-5 w-28 mb-1" />
                        <Skeleton className="h-4 w-32 mb-1" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                      <div>
                        <Skeleton className="h-4 w-20 mb-1" />
                        <Skeleton className="h-4 w-16 mb-1" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                      <div>
                        <Skeleton className="h-6 w-16" />
                      </div>
                    </div>
                    <Skeleton className="h-8 w-8 ml-4" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Applications</h1>
            <p className="text-muted-foreground">
              Manage job applications and candidate information
            </p>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="interview">Interview</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>

              {/* <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button> */}
            </div>
          </CardContent>
        </Card>

        {/* Applications Table */}
        <Card>
          <CardHeader>
            <CardTitle>
              Recent Applications ({filteredApplications.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredApplications.map((application) => (
                <div
                  key={application.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <h3 className="font-semibold">{application.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {application.phone}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {application.email}
                      </p>
                    </div>

                    <div>
                      <p className="font-medium">{application.job_title}</p>
                      <p className="text-sm text-muted-foreground">
                        {application.company}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {application.location}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Applied:</span>{" "}
                        {new Date(
                          application.applied_date
                        ).toLocaleDateString()}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Passport:</span>{" "}
                        {application.passport_status}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {application.experience}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge className={getStatusColor(application.status)}>
                        {application.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedApplication(application)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Application Details</DialogTitle>
                        </DialogHeader>
                        {selectedApplication && (
                          <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h3 className="font-semibold mb-2">
                                  Personal Information
                                </h3>
                                <div className="space-y-2 text-sm">
                                  <p>
                                    <span className="font-medium">Name:</span>{" "}
                                    {selectedApplication.name}
                                  </p>
                                  <p>
                                    <span className="font-medium">Email:</span>{" "}
                                    {selectedApplication.email}
                                  </p>
                                  <p>
                                    <span className="font-medium">Phone:</span>{" "}
                                    {selectedApplication.phone}
                                  </p>
                                  <p>
                                    <span className="font-medium">
                                      Passport:
                                    </span>{" "}
                                    {selectedApplication.passport_status}
                                  </p>
                                </div>
                              </div>

                              <div>
                                <h3 className="font-semibold mb-2">
                                  Job Information
                                </h3>
                                <div className="space-y-2 text-sm">
                                  <p>
                                    <span className="font-medium">
                                      Position:
                                    </span>{" "}
                                    {selectedApplication.job_title}
                                  </p>
                                  <p>
                                    <span className="font-medium">
                                      Company:
                                    </span>{" "}
                                    {selectedApplication.company}
                                  </p>
                                  <p>
                                    <span className="font-medium">
                                      Location:
                                    </span>{" "}
                                    {selectedApplication.location}
                                  </p>
                                  <p>
                                    <span className="font-medium">
                                      Applied Date:
                                    </span>{" "}
                                    {new Date(
                                      selectedApplication.applied_date
                                    ).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h3 className="font-semibold mb-2">Experience</h3>
                              <p className="text-sm text-muted-foreground">
                                {selectedApplication.experience}
                              </p>
                            </div>

                            {selectedApplication.notes && (
                              <div>
                                <h3 className="font-semibold mb-2">Notes</h3>
                                <p className="text-sm text-muted-foreground">
                                  {selectedApplication.notes}
                                </p>
                              </div>
                            )}

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium">
                                  Status:
                                </span>
                                <Select
                                  value={selectedApplication.status}
                                  onValueChange={(value) =>
                                    handleStatusChange(
                                      selectedApplication.id,
                                      value
                                    )
                                  }
                                >
                                  <SelectTrigger className="w-32">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pending">
                                      Pending
                                    </SelectItem>
                                    <SelectItem value="approved">
                                      Approved
                                    </SelectItem>
                                    <SelectItem value="interview">
                                      Interview
                                    </SelectItem>
                                    <SelectItem value="rejected">
                                      Rejected
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <Button
                                variant="outline"
                                onClick={() =>
                                  handleDownloadCV(selectedApplication.name)
                                }
                              >
                                <Download className="h-4 w-4 mr-2" />
                                Download CV
                              </Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))}
            </div>

            {filteredApplications.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  No applications found matching your criteria.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

'use client'

import React, { useState } from 'react'
import { Menu, Search, Upload, FileText, Users, BarChart2, Settings, PieChart, TrendingUp, Calendar, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Label } from "@/components/ui/label"

export default function DashboardDesign() {
  const [bulkResumes, setBulkResumes] = useState<File[]>([])
  const [jobDescription, setJobDescription] = useState<File | null>(null)
  const [isAdvancedOptionsOpen, setIsAdvancedOptionsOpen] = useState(false)

  const handleBulkResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files)
      setBulkResumes(files)
    }
  }

  const handleJobDescriptionUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setJobDescription(event.target.files[0])
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="bg-indigo-700 text-white w-64 min-h-screen p-4">
        <div className="flex items-center mb-8">
          <span className="text-2xl font-bold">GenHire.io</span>
        </div>
        <nav>
          <ul className="space-y-2">
            <li>
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-indigo-600">
                <BarChart2 className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-indigo-600">
                <Upload className="mr-2 h-4 w-4" />
                Bulk Resume Screening
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-indigo-600">
                <FileText className="mr-2 h-4 w-4" />
                Job Descriptions
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-indigo-600">
                <Users className="mr-2 h-4 w-4" />
                Candidates
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-indigo-600">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-indigo-600">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <Menu className="h-6 w-6 mr-4" />
              <Input type="text" placeholder="Search candidates..." className="w-64" />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Bulk Resume Screening Dashboard</h1>

            <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Resumes Screened</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,257</div>
                  <p className="text-xs text-muted-foreground">+20% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Match Score</CardTitle>
                  <PieChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">76%</div>
                  <p className="text-xs text-muted-foreground">+5% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Job Postings</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">23</div>
                  <p className="text-xs text-muted-foreground">3 closing this week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Time Saved</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">320 hrs</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Bulk Resume Screening</CardTitle>
                <p className="text-sm text-gray-500">Upload multiple resumes to screen against a job description</p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Label htmlFor="bulk-resume-upload" className="text-sm font-medium text-gray-700">
                      Upload Resumes (up to 50)
                    </Label>
                    <div className="mt-2">
                      <label 
                        htmlFor="bulk-resume-upload" 
                        className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-200 rounded-xl cursor-pointer bg-white transition-colors duration-200 ease-in-out hover:bg-indigo-50 hover:border-indigo-500"
                      >
                        <div className="flex flex-col items-center justify-center p-6">
                          <Upload className="w-8 h-8 mb-2 text-indigo-600" />
                          <span className="text-lg font-semibold text-indigo-600">SELECT RESUMES</span>
                        </div>
                        <input
                          id="bulk-resume-upload"
                          type="file"
                          className="hidden"
                          multiple
                          onChange={handleBulkResumeUpload}
                          accept=".pdf,.doc,.docx"
                        />
                      </label>
                      <p className="mt-2 text-sm text-gray-500">
                        {bulkResumes.length} file(s) selected
                      </p>
                    </div>
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="job-description-upload" className="text-sm font-medium text-gray-700">
                      Upload Job Description
                    </Label>
                    <div className="mt-2">
                      <label 
                        htmlFor="job-description-upload" 
                        className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-200 rounded-xl cursor-pointer bg-white transition-colors duration-200 ease-in-out hover:bg-indigo-50 hover:border-indigo-500"
                      >
                        <div className="flex flex-col items-center justify-center p-6">
                          <FileText className="w-8 h-8 mb-2 text-indigo-600" />
                          <span className="text-lg font-semibold text-indigo-600">SELECT JOB DESCRIPTION</span>
                        </div>
                        <input
                          id="job-description-upload"
                          type="file"
                          className="hidden"
                          onChange={handleJobDescriptionUpload}
                          accept=".pdf,.doc,.docx"
                        />
                      </label>
                      <p className="mt-2 text-sm text-gray-500">
                        {jobDescription ? jobDescription.name : 'No file selected'}
                      </p>
                    </div>
                  </div>
                </div>
                <Collapsible
                  open={isAdvancedOptionsOpen}
                  onOpenChange={setIsAdvancedOptionsOpen}
                  className="mt-4"
                >
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      Advanced Screening Options
                      {isAdvancedOptionsOpen ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-4 space-y-4">
                    <div>
                      <Label htmlFor="reference-resume" className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Reference Resume (optional)
                      </Label>
                      <Input
                        id="reference-resume"
                        type="file"
                        accept=".pdf,.doc,.docx"
                      />
                    </div>
                    <Input placeholder="Primary Skills (e.g., JavaScript, React, Node.js)" />
                    <Input placeholder="Secondary Skills (e.g., Python, SQL, AWS)" />
                  </CollapsibleContent>
                </Collapsible>
                <Button className="mt-4">
                  Start Bulk Screening
                </Button>
              </CardContent>
            </Card>

            <div className="grid gap-6 mb-8 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Screening Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { id: 1, name: 'John Doe', position: 'Software Engineer', matchScore: 85 },
                      { id: 2, name: 'Jane Smith', position: 'Product Manager', matchScore: 92 },
                      { id: 3, name: 'Bob Johnson', position: 'Data Analyst', matchScore: 78 },
                      { id: 4, name: 'Alice Brown', position: 'UX Designer', matchScore: 88 },
                      { id: 5, name: 'Charlie Davis', position: 'Marketing Specialist', matchScore: 82 },
                    ].map((candidate) => (
                      <div key={candidate.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{candidate.name}</p>
                            <p className="text-sm text-gray-500">{candidate.position}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">{candidate.matchScore}% Match</span>
                          <Progress value={candidate.matchScore} className="w-20" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Screening Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="skills">
                    <TabsList className="mb-4">
                      <TabsTrigger value="skills">Top Skills</TabsTrigger>
                      <TabsTrigger value="education">Education</TabsTrigger>
                      <TabsTrigger value="experience">Experience</TabsTrigger>
                    </TabsList>
                    <TabsContent value="skills">
                      <ul className="space-y-2">
                        {[
                          { skill: 'JavaScript', match: 92 },
                          { skill: 'React', match: 88 },
                          { skill: 'Node.js', match: 85 },
                          { skill: 'Python', match: 80 },
                          { skill: 'SQL', match: 78 },
                        ].map((item) => (
                          <li key={item.skill} className="flex items-center justify-between">
                            <span>{item.skill}</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-500">{item.match}% match</span>
                              <Progress value={item.match}   className="w-20" />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </TabsContent>
                    <TabsContent value="education">
                      <ul className="space-y-2">
                        {[
                          { level: "Bachelor's Degree", match: 95 },
                          { level: "Master's Degree", match: 75 },
                          { level: "Ph.D.", match: 30 },
                        ].map((item) => (
                          <li key={item.level} className="flex items-center justify-between">
                            <span>{item.level}</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-500">{item.match}% match</span>
                              <Progress value={item.match} className="w-20" />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </TabsContent>
                    <TabsContent value="experience">
                      <ul className="space-y-2">
                        {[
                          { range: '0-2 years', match: 60 },
                          { range: '3-5 years', match: 90 },
                          { range: '5+ years', match: 70 },
                        ].map((item) => (
                          <li key={item.range} className="flex items-center justify-between">
                            <span>{item.range}</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-500">{item.match}% match</span>
                              <Progress value={item.match} className="w-20" />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
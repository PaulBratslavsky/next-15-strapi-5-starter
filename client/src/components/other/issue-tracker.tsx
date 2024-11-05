"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PlusCircle, Search } from "lucide-react"

type Issue = {
  id: number
  title: string
  description: string
  type: "feature" | "bug"
  status: "open" | "in-progress" | "closed"
}

export function IssueTracker() {
  const [issues, setIssues] = useState<Issue[]>([
    { id: 1, title: "Implement dark mode", description: "Add support for dark mode throughout the app", type: "feature", status: "open" },
    { id: 2, title: "Fix login bug", description: "Users unable to log in on Firefox browser", type: "bug", status: "in-progress" },
    { id: 3, title: "Add user profile page", description: "Create a page for users to view and edit their profile", type: "feature", status: "open" },
    { id: 4, title: "Optimize image loading", description: "Improve performance of image loading in the gallery", type: "feature", status: "closed" },
    { id: 5, title: "Fix broken links in footer", description: "Several links in the footer are not working", type: "bug", status: "open" },
  ])

  const [newIssue, setNewIssue] = useState<Omit<Issue, "id" | "status">>({
    title: "",
    description: "",
    type: "feature",
  })

  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const itemsPerPage = 5

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const id = issues.length + 1
    setIssues([...issues, { ...newIssue, id, status: "open" }])
    setNewIssue({ title: "", description: "", type: "feature" })
    setIsModalOpen(false)
  }

  const filteredIssues = issues.filter(issue =>
    issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    issue.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const pageCount = Math.ceil(filteredIssues.length / itemsPerPage)
  const paginatedIssues = filteredIssues.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const getStatusBadge = (status: Issue["status"]) => {
    switch (status) {
      case "open":
        return <Badge variant="secondary">Open</Badge>
      case "in-progress":
        return <Badge variant="default">In Progress</Badge>
      case "closed":
        return <Badge variant="outline">Closed</Badge>
    }
  }

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Issue Tracker</h1>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Issue
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Issue</DialogTitle>
              <DialogDescription>Add a new feature request or bug report</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter issue title"
                  value={newIssue.title}
                  onChange={(e) => setNewIssue({ ...newIssue, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the issue"
                  value={newIssue.description}
                  onChange={(e) => setNewIssue({ ...newIssue, description: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select
                  value={newIssue.type}
                  onValueChange={(value: "feature" | "bug") => setNewIssue({ ...newIssue, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select issue type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="feature">Feature</SelectItem>
                    <SelectItem value="bug">Bug</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit">Submit Issue</Button>
            </form>
          </DialogContent>
        </Dialog>
      </header>

      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search issues..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedIssues.map((issue) => (
            <TableRow key={issue.id}>
              <TableCell className="font-medium">{issue.title}</TableCell>
              <TableCell>
                <Badge variant={issue.type === "feature" ? "default" : "destructive"}>
                  {issue.type === "feature" ? "Feature" : "Bug"}
                </Badge>
              </TableCell>
              <TableCell>{getStatusBadge(issue.status)}</TableCell>
              <TableCell className="max-w-xs truncate">{issue.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center mt-4">
        <div>
          Showing {Math.min(itemsPerPage, filteredIssues.length)} of {filteredIssues.length} issues
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
            disabled={currentPage === pageCount}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
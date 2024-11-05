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
import { PlusCircle, Search, ThumbsUp } from "lucide-react"

type Suggestion = {
  id: number
  title: string
  description: string
  type: "question" | "topic"
  upvotes: number
}

export function Suggestions() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([
    { id: 1, title: "How to start a YouTube channel?", description: "A beginner's guide to starting a YouTube channel from scratch", type: "question", upvotes: 15 },
    { id: 2, title: "Top 10 video editing software", description: "Review and comparison of the best video editing software for YouTubers", type: "topic", upvotes: 8 },
    { id: 3, title: "Monetization strategies", description: "Different ways to monetize a YouTube channel beyond AdSense", type: "topic", upvotes: 12 },
    { id: 4, title: "How often should I upload?", description: "Discussing optimal upload frequency for channel growth", type: "question", upvotes: 6 },
    { id: 5, title: "Collaborating with other YouTubers", description: "Tips and strategies for successful collaborations", type: "topic", upvotes: 10 },
  ])

  const [newSuggestion, setNewSuggestion] = useState<Omit<Suggestion, "id" | "upvotes">>({
    title: "",
    description: "",
    type: "topic",
  })

  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const itemsPerPage = 5

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const id = suggestions.length + 1
    setSuggestions([...suggestions, { ...newSuggestion, id, upvotes: 0 }])
    setNewSuggestion({ title: "", description: "", type: "topic" })
    setIsModalOpen(false)
  }

  const handleUpvote = (id: number) => {
    setSuggestions(suggestions.map(suggestion =>
      suggestion.id === id ? { ...suggestion, upvotes: suggestion.upvotes + 1 } : suggestion
    ))
  }

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    suggestion.description.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => b.upvotes - a.upvotes)

  const pageCount = Math.ceil(filteredSuggestions.length / itemsPerPage)
  const paginatedSuggestions = filteredSuggestions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">YouTube Content Suggestions</h1>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Suggestion
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit Content Suggestion</DialogTitle>
              <DialogDescription>Suggest a question or topic for future videos</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter suggestion title"
                  value={newSuggestion.title}
                  onChange={(e) => setNewSuggestion({ ...newSuggestion, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide more details about your suggestion"
                  value={newSuggestion.description}
                  onChange={(e) => setNewSuggestion({ ...newSuggestion, description: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select
                  value={newSuggestion.type}
                  onValueChange={(value: "question" | "topic") => setNewSuggestion({ ...newSuggestion, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select suggestion type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="question">Question</SelectItem>
                    <SelectItem value="topic">Topic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit">Submit Suggestion</Button>
            </form>
          </DialogContent>
        </Dialog>
      </header>

      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search suggestions..."
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
            <TableHead>Description</TableHead>
            <TableHead>Upvotes</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedSuggestions.map((suggestion) => (
            <TableRow key={suggestion.id}>
              <TableCell className="font-medium">{suggestion.title}</TableCell>
              <TableCell>
                <Badge variant={suggestion.type === "topic" ? "default" : "secondary"}>
                  {suggestion.type === "topic" ? "Topic" : "Question"}
                </Badge>
              </TableCell>
              <TableCell className="max-w-xs truncate">{suggestion.description}</TableCell>
              <TableCell>{suggestion.upvotes}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" onClick={() => handleUpvote(suggestion.id)}>
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  Upvote
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center mt-4">
        <div>
          Showing {Math.min(itemsPerPage, filteredSuggestions.length)} of {filteredSuggestions.length} suggestions
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
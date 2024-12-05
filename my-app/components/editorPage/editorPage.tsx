'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PenLine, Trash2, BookOpen, Check, X } from 'lucide-react'

// Mock data
const editorData = {
  name: 'John Editor',
  books: [
    { id: '1', title: 'The Great Novel', author: 'Jane Doe', status: 'published' },
    { id: '2', title: 'Upcoming Thriller', author: 'John Smith', status: 'pending' },
  ],
  verificationRequests: [
    { id: '1', name: 'Alice Writer', bio: 'Aspiring author with 3 self-published books.' },
    { id: '2', name: 'Bob Novelist', bio: 'Award-winning writer with 10 years of experience.' },
  ]
}

export default function EditorDashboard() {
  const [editor, setEditor] = useState(editorData)
  const [selectedBook, setSelectedBook] = useState(null)

  const handleBookAction = (id: string, action: 'publish' | 'delete') => {
    // Here you would typically make an API call to publish or delete the book
    setEditor(prevEditor => ({
      ...prevEditor,
      books: prevEditor.books.map(book => 
        book.id === id 
          ? { ...book, status: action === 'publish' ? 'published' : 'deleted' }
          : book
      )
    }))
  }

  const handleVerificationAction = (id: string, action: 'accept' | 'decline') => {
    // Here you would typically make an API call to accept or decline the verification request
    setEditor(prevEditor => ({
      ...prevEditor,
      verificationRequests: prevEditor.verificationRequests.filter(request => request.id !== id)
    }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Editor Dashboard</CardTitle>
          <CardDescription>Manage books and author verification requests</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="books">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="books">Books</TabsTrigger>
              <TabsTrigger value="verification">Verification Requests</TabsTrigger>
            </TabsList>
            <TabsContent value="books">
              <ScrollArea className="h-[400px]">
                {editor.books.map(book => (
                  <Card key={book.id} className="mb-4">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{book.title}</CardTitle>
                        <CardDescription>{book.author}</CardDescription>
                      </div>
                      <Badge variant={book.status === 'published' ? 'default' : 'secondary'}>
                        {book.status}
                      </Badge>
                    </CardHeader>
                    <CardFooter className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm" onClick={() => setSelectedBook(book)}>
                        <PenLine className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      {book.status !== 'published' && (
                        <Button variant="default" size="sm" onClick={() => handleBookAction(book.id, 'publish')}>
                          <BookOpen className="mr-2 h-4 w-4" />
                          Publish
                        </Button>
                      )}
                      <Button variant="destructive" size="sm" onClick={() => handleBookAction(book.id, 'delete')}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="verification">
              <ScrollArea className="h-[400px]">
                {editor.verificationRequests.map(request => (
                  <Card key={request.id} className="mb-4">
                    <CardHeader>
                      <CardTitle className="text-lg">{request.name}</CardTitle>
                      <CardDescription>{request.bio}</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-end space-x-2">
                      <Button variant="default" size="sm" onClick={() => handleVerificationAction(request.id, 'accept')}>
                        <Check className="mr-2 h-4 w-4" />
                        Accept
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleVerificationAction(request.id, 'decline')}>
                        <X className="mr-2 h-4 w-4" />
                        Decline
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      {selectedBook && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Edit Book: {selectedBook.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <Input id="title" defaultValue={selectedBook.title} />
              </div>
              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author</label>
                <Input id="author" defaultValue={selectedBook.author} />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <Textarea id="description" rows={4} />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setSelectedBook(null)}>Cancel</Button>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
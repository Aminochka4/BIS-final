'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Trash2, BookOpen, PenLine } from 'lucide-react'

// Mock data
const authorData = {
  name: 'Jane Doe',
  avatar: '/placeholder.svg?height=100&width=100',
  bio: 'Bestselling author of fiction and non-fiction books.',
  books: [
    { id: '1', title: 'The Great Novel', year: 2023, status: 'published' },
    { id: '2', title: 'Poetry Collection', year: 2022, status: 'published' },
    { id: '3', title: 'Upcoming Thriller', year: 2024, status: 'draft' },
  ]
}

export default function AuthorDashboard() {
  const [author, setAuthor] = useState(authorData)

  const deleteBook = (id: string) => {
    // Here you would typically make an API call to delete the book
    setAuthor(prevAuthor => ({
      ...prevAuthor,
      books: prevAuthor.books.filter(book => book.id !== id)
    }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{author.name}</CardTitle>
            <CardDescription>{author.bio}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-4">My Books</h3>
          <ScrollArea className="h-[400px]">
            {author.books.map(book => (
              <Card key={book.id} className="mb-4">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{book.title}</CardTitle>
                    <CardDescription>{book.year}</CardDescription>
                  </div>
                  <Badge variant={book.status === 'published' ? 'default' : 'secondary'}>
                    {book.status}
                  </Badge>
                </CardHeader>
                <CardFooter className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    <PenLine className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => deleteBook(book.id)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            <BookOpen className="mr-2 h-4 w-4" />
            Add New Book
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
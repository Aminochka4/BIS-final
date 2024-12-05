'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, User } from 'lucide-react'

// Mock data
const searchResults = {
  books: [
    { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925 },
    { id: '2', title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 },
    { id: '3', title: '1984', author: 'George Orwell', year: 1949 },
  ],
  authors: [
    { id: '1', name: 'Jane Austen', books: 6 },
    { id: '2', name: 'Ernest Hemingway', books: 7 },
    { id: '3', name: 'Virginia Woolf', books: 9 },
  ]
}

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState(searchResults)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically make an API call to search for books and authors
    console.log('Searching for:', searchTerm)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Search BookHub</CardTitle>
          <CardDescription>Find your favorite books and authors</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex space-x-2 mb-4">
            <Input
              type="search"
              placeholder="Search for books or authors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit">Search</Button>
          </form>
          <Tabs defaultValue="books">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="books">Books</TabsTrigger>
              <TabsTrigger value="authors">Authors</TabsTrigger>
            </TabsList>
            <TabsContent value="books">
              <ScrollArea className="h-[400px]">
                {results.books.map(book => (
                  <Card key={book.id} className="mb-4">
                    <CardHeader>
                      <CardTitle className="text-lg">{book.title}</CardTitle>
                      <CardDescription>{book.author}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Published: {book.year}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        <BookOpen className="mr-2 h-4 w-4" />
                        View Book
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="authors">
              <ScrollArea className="h-[400px]">
                {results.authors.map(author => (
                  <Card key={author.id} className="mb-4">
                    <CardHeader className="flex flex-row items-center space-x-4">
                      <Avatar>
                        <AvatarFallback>{author.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{author.name}</CardTitle>
                        <CardDescription>{author.books} books published</CardDescription>
                      </div>
                    </CardHeader>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        <User className="mr-2 h-4 w-4" />
                        View Profile
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
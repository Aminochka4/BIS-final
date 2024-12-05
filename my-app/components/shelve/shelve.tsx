'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Trash2, PlusCircle, BookOpen } from 'lucide-react'

// Mock data
const initialShelve = [
  { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Classics' },
  { id: '2', title: '1984', author: 'George Orwell', category: 'Science Fiction' },
  // ... more books
]

const initialCategories = ['Classics', 'Science Fiction', 'Mystery', 'Romance']

export default function Shelve() {
  const [books, setBooks] = useState(initialShelve)
  const [categories, setCategories] = useState(initialCategories)
  const [newBook, setNewBook] = useState({ title: '', author: '', category: '' })
  const [newCategory, setNewCategory] = useState('')

  const addBook = () => {
    if (newBook.title && newBook.author && newBook.category) {
      setBooks([...books, { id: Date.now().toString(), ...newBook }])
      setNewBook({ title: '', author: '', category: '' })
    }
  }

  const deleteBook = (id: string) => {
    setBooks(books.filter(book => book.id !== id))
  }

  const addCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory])
      setNewCategory('')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">My Shelve</CardTitle>
          <CardDescription>Manage your book collection</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 mb-4">
            <Input
              placeholder="Book Title"
              value={newBook.title}
              onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            />
            <Input
              placeholder="Author"
              value={newBook.author}
              onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
            />
            <Select
              value={newBook.category}
              onValueChange={(value) => setNewBook({ ...newBook, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={addBook}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Book
            </Button>
          </div>
          <div className="flex items-center space-x-2 mb-4">
            <Input
              placeholder="New Category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <Button onClick={addCategory}>Add Category</Button>
          </div>
          <ScrollArea className="h-[400px]">
            {books.map(book => (
              <Card key={book.id} className="mb-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{book.title}</CardTitle>
                    <CardDescription>{book.author}</CardDescription>
                  </div>
                  <Button variant="destructive" size="icon" onClick={() => deleteBook(book.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <Badge>{book.category}</Badge>
                </CardContent>
              </Card>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
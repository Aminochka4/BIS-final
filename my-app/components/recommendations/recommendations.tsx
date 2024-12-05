'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, BookOpen } from 'lucide-react'

// Mock data
const recommendationsData = {
  personalized: [
    { id: '1', title: 'The Midnight Library', author: 'Matt Haig', rating: 4.2 },
    { id: '2', title: 'Atomic Habits', author: 'James Clear', rating: 4.5 },
    { id: '3', title: 'The Song of Achilles', author: 'Madeline Miller', rating: 4.3 },
  ],
  curated: [
    { id: '4', title: 'Dune', author: 'Frank Herbert', rating: 4.7 },
    { id: '5', title: 'To Kill a Mockingbird', author: 'Harper Lee', rating: 4.8 },
    { id: '6', title: '1984', author: 'George Orwell', rating: 4.6 },
  ]
}

export default function BookRecommendations() {
  const [recommendations, setRecommendations] = useState(recommendationsData)

  const renderBookList = (books) => (
    <ScrollArea className="h-[400px]">
      {books.map(book => (
        <Card key={book.id} className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg">{book.title}</CardTitle>
            <CardDescription>{book.author}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Star className="mr-2 h-4 w-4 fill-primary" />
              <span>{book.rating.toFixed(1)}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <BookOpen className="mr-2 h-4 w-4" />
              View Details
            </Button>
          </CardFooter>
        </Card>
      ))}
    </ScrollArea>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Book Recommendations</CardTitle>
          <CardDescription>Discover your next favorite read</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="personalized">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="personalized">Personalized</TabsTrigger>
              <TabsTrigger value="curated">Curated</TabsTrigger>
            </TabsList>
            <TabsContent value="personalized">
              {renderBookList(recommendations.personalized)}
            </TabsContent>
            <TabsContent value="curated">
              {renderBookList(recommendations.curated)}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
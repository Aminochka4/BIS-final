'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BookOpen, Star, MessageSquare } from 'lucide-react'

// Mock data
const initialFeed = [
  { id: '1', type: 'review', user: 'Alice', book: 'The Midnight Library', rating: 4, content: 'A thought-provoking read!' },
  { id: '2', type: 'newBook', user: 'Bob', book: 'Atomic Habits', author: 'James Clear' },
  { id: '3', type: 'comment', user: 'Charlie', book: 'Dune', content: 'The worldbuilding is incredible.' },
  // ... more feed items
]

export default function ActivityFeed() {
  const [feed, setFeed] = useState(initialFeed)

  const renderFeedItem = (item) => {
    switch (item.type) {
      case 'review':
        return (
          <Card key={item.id} className="mb-4">
            <CardHeader className="flex flex-row items-center space-x-4">
              <Avatar>
                <AvatarFallback>{item.user[0]}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{item.user} reviewed a book</CardTitle>
                <CardDescription>{item.book}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-2">
                <Star className="mr-2 h-4 w-4 fill-primary" />
                <span>{item.rating} / 5</span>
              </div>
              <p>{item.content}</p>
            </CardContent>
          </Card>
        )
      case 'newBook':
        return (
          <Card key={item.id} className="mb-4">
            <CardHeader className="flex flex-row items-center space-x-4">
              <Avatar>
                <AvatarFallback>{item.user[0]}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{item.user} added a new book</CardTitle>
                <CardDescription>{item.book} by {item.author}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <BookOpen className="h-6 w-6" />
            </CardContent>
          </Card>
        )
      case 'comment':
        return (
          <Card key={item.id} className="mb-4">
            <CardHeader className="flex flex-row items-center space-x-4">
              <Avatar>
                <AvatarFallback>{item.user[0]}</AvatarFallback>
              
              </Avatar>
              <div>
                <CardTitle className="text-lg">{item.user} commented on {item.book}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-2">
                <MessageSquare className="mr-2 h-4 w-4" />
              </div>
              <p>{item.content}</p>
            </CardContent>
          </Card>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Activity Feed</CardTitle>
          <CardDescription>Recent updates from people you follow</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            {feed.map(renderFeedItem)}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BookOpen, Star, Users } from 'lucide-react'

// Mock data
const userData = {
  id: '1',
  name: 'Jane Doe',
  avatar: '/placeholder.svg?height=100&width=100',
  bio: 'Avid reader and occasional writer',
  isAuthor: true,
  followers: 1234,
  following: 567,
  shelve: [
    { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Classics' },
    { id: '2', title: '1984', author: 'George Orwell', category: 'Science Fiction' },
    // ... more books
  ],
  publishedBooks: [
    { id: '1', title: 'My First Novel', year: 2022 },
    { id: '2', title: 'Poetry Collection', year: 2023 },
  ],
  reviews: [
    { id: '1', bookTitle: 'To Kill a Mockingbird', rating: 9, content: 'A timeless classic that explores...' },
    { id: '2', bookTitle: 'The Catcher in the Rye', rating: 8, content: 'Holden\'s journey is a poignant...' },
    // ... more reviews
  ]
}

export default function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState(userData)
  const [isFollowing, setIsFollowing] = useState(false)

  const handleFollowToggle = () => {
    // Here you would typically make an API call to follow/unfollow
    setIsFollowing(!isFollowing)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-2xl">{user.name}</CardTitle>
            <CardDescription>{user.bio}</CardDescription>
          </div>
          <Button onClick={handleFollowToggle}>
            {isFollowing ? 'Unfollow' : 'Follow'}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <span className="flex items-center"><Users className="mr-2 h-4 w-4" />{user.followers} Followers</span>
            <span className="flex items-center"><Users className="mr-2 h-4 w-4" />{user.following} Following</span>
          </div>
          <Tabs defaultValue="shelve">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="shelve">Shelve</TabsTrigger>
              {user.isAuthor && <TabsTrigger value="books">Published Books</TabsTrigger>}
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="shelve">
              <ScrollArea className="h-[300px]">
                {user.shelve.map(book => (
                  <Card key={book.id} className="mb-2">
                    <CardHeader>
                      <CardTitle className="text-lg">{book.title}</CardTitle>
                      <CardDescription>{book.author}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Badge>{book.category}</Badge>
                    </CardContent>
                  </Card>
                ))}
              </ScrollArea>
            </TabsContent>
            {user.isAuthor && (
              <TabsContent value="books">
                <ScrollArea className="h-[300px]">
                  {user.publishedBooks.map(book => (
                    <Card key={book.id} className="mb-2">
                      <CardHeader>
                        <CardTitle className="text-lg">{book.title}</CardTitle>
                        <CardDescription>Published in {book.year}</CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </ScrollArea>
              </TabsContent>
            )}
            <TabsContent value="reviews">
              <ScrollArea className="h-[300px]">
                {user.reviews.map(review => (
                  <Card key={review.id} className="mb-2">
                    <CardHeader>
                      <CardTitle className="text-lg">{review.bookTitle}</CardTitle>
                      <CardDescription className="flex items-center">
                        <Star className="mr-1 h-4 w-4 fill-primary" />
                        Rating: {review.rating}/10
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{review.content}</p>
                    </CardContent>
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
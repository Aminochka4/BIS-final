'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ThumbsUp, MessageSquare } from 'lucide-react'

// Mock data
const bookData = {
  id: '1',
  title: 'The Great Novel',
  author: 'Jane Doe',
  cover: '/placeholder.svg?height=300&width=200',
  description: 'A captivating story of adventure and self-discovery...',
  rating: 4.5,
  reviews: [
    { id: '1', user: 'John Smith', avatar: '/placeholder.svg?height=50&width=50', rating: 5, content: 'Absolutely loved it!', likes: 10, comments: [] },
    { id: '2', user: 'Alice Johnson', avatar: '/placeholder.svg?height=50&width=50', rating: 4, content: 'Great read, highly recommend.', likes: 5, comments: [] },
  ]
}

export default function BookPage({ bookId }: { bookId: string }) {
  const [book, setBook] = useState(bookData)
  const [userRating, setUserRating] = useState<number | null>(null)
  const [readingStatus, setReadingStatus] = useState<string | null>(null)
  const [comment, setComment] = useState('')

  const handleRating = (rating: number) => {
    setUserRating(rating)
    // Here you would typically make an API call to update the rating
  }

  const handleStatusChange = (status: string) => {
    setReadingStatus(status)
    // Here you would typically make an API call to update the reading status
  }

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      // Here you would typically make an API call to submit the comment
      setComment('')
    }
  }

  const handleLikeReview = (reviewId: string) => {
    // Here you would typically make an API call to like/unlike the review
    setBook(prevBook => ({
      ...prevBook,
      reviews: prevBook.reviews.map(review =>
        review.id === reviewId ? { ...review, likes: review.likes + 1 } : review
      )
    }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <img src={book.cover} alt={book.title} className="w-32 h-48 object-cover" />
          <div>
            <CardTitle className="text-2xl">{book.title}</CardTitle>
            <CardDescription>by {book.author}</CardDescription>
            <div className="mt-2">
              <Badge variant="secondary">Rating: {book.rating.toFixed(1)}/5</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{book.description}</p>
          <div className="flex gap-4 mb-4">
            <Select onValueChange={handleStatusChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Reading Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="to-read">To Read</SelectItem>
                <SelectItem value="reading">Currently Reading</SelectItem>
                <SelectItem value="read">Read</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => handleRating(parseInt(value))}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Rate this book" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map(rating => (
                  <SelectItem key={rating} value={rating.toString()}>{rating} Star{rating !== 1 ? 's' : ''}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Textarea
            placeholder="Leave a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mb-2"
          />
          <Button onClick={handleCommentSubmit}>Submit Comment</Button>
        </CardContent>
        <CardFooter>
          <ScrollArea className="h-[300px] w-full">
            {book.reviews.map(review => (
              <Card key={review.id} className="mb-4">
                <CardHeader className="flex flex-row items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={review.avatar} alt={review.user} />
                    <AvatarFallback>{review.user[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{review.user}</CardTitle>
                    <CardDescription>Rating: {review.rating}/5</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{review.content}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="ghost" size="sm" onClick={() => handleLikeReview(review.id)}>
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    {review.likes} Likes
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    {review.comments.length} Comments
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </ScrollArea>
        </CardFooter>
      </Card>
    </div>
  )
}
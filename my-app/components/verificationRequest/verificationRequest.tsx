'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Send } from 'lucide-react'

export default function VerificationRequest() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    publishedWorks: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Here you would typically make an API call to submit the verification request
    await new Promise(resolve => setTimeout(resolve, 2000)) // Simulating API call
    setIsSubmitting(false)
    // Reset form or show success message
    setFormData({ name: '', email: '', bio: '', publishedWorks: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Author Verification Request</CardTitle>
          <CardDescription>Submit your information to be verified as an author on BookHub</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Author Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="publishedWorks">Published Works</Label>
              <Textarea
                id="publishedWorks"
                name="publishedWorks"
                value={formData.publishedWorks}
                onChange={handleChange}
                placeholder="List your published books, articles, or other relevant works"
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              <Send className="mr-2 h-4 w-4" />
              {isSubmitting ? 'Submitting...' : 'Submit Verification Request'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
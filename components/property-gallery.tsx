'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react'

interface PropertyGalleryProps {
  images: string[] | null
  videoUrl?: string | null
}

export function PropertyGallery({ images, videoUrl }: PropertyGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [showVideo, setShowVideo] = useState(false)

  const allImages = images || []
  const hasImages = allImages.length > 0

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % allImages.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  if (!hasImages && !videoUrl) {
    return (
      <div className="flex aspect-[16/9] items-center justify-center rounded-xl bg-muted">
        <span className="text-muted-foreground">Nessuna immagine disponibile</span>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-4">
        {/* Main image */}
        <div 
          className="relative aspect-[16/9] cursor-pointer overflow-hidden rounded-xl"
          onClick={() => setLightboxOpen(true)}
        >
          {hasImages ? (
            <Image
              src={allImages[currentIndex]}
              alt={`Immagine ${currentIndex + 1}`}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-muted">
              <span className="text-muted-foreground">Nessuna immagine</span>
            </div>
          )}

          {hasImages && allImages.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2"
                onClick={(e) => {
                  e.stopPropagation()
                  prevImage()
                }}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2"
                onClick={(e) => {
                  e.stopPropagation()
                  nextImage()
                }}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-foreground/70 px-3 py-1 text-sm text-background">
                {currentIndex + 1} / {allImages.length}
              </div>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {(hasImages || videoUrl) && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {allImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                  index === currentIndex ? 'border-primary' : 'border-transparent'
                }`}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
            {videoUrl && (
              <button
                onClick={() => setShowVideo(true)}
                className="relative flex h-20 w-28 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border-2 border-transparent bg-muted transition-colors hover:border-primary"
              >
                <Play className="h-8 w-8 text-primary" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-5xl border-0 bg-transparent p-0">
          <div className="relative">
            <Button
              variant="secondary"
              size="icon"
              className="absolute -right-12 top-0 z-10"
              onClick={() => setLightboxOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
            {hasImages && (
              <div className="relative aspect-[16/9]">
                <Image
                  src={allImages[currentIndex]}
                  alt={`Immagine ${currentIndex + 1}`}
                  fill
                  className="rounded-xl object-contain"
                />
                {allImages.length > 1 && (
                  <>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute left-4 top-1/2 -translate-y-1/2"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Video modal */}
      <Dialog open={showVideo} onOpenChange={setShowVideo}>
        <DialogContent className="max-w-4xl">
          <div className="aspect-video">
            <iframe
              src={videoUrl || ''}
              className="h-full w-full rounded-lg"
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

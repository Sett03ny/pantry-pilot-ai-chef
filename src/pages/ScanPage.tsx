
import { useState, useRef } from "react";
import { MobileLayout } from "@/components/mobile-layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { Camera, Upload, FileText, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { performOCR } from "@/lib/ocr-service";
import { toast } from "@/components/ui/use-toast";

export default function ScanPage() {
  const [scanState, setScanState] = useState<'idle' | 'camera' | 'scanning' | 'processing' | 'results'>('idle');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [ocrResults, setOcrResults] = useState<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageData = e.target?.result as string;
        setPreviewImage(imageData);
        setScanState('processing');
        
        try {
          // Perform OCR on the image
          const results = await performOCR(imageData);
          setOcrResults(results);
          setScanState('results');
          toast({
            title: "Receipt scanned successfully!",
            description: `Found ${results.items.length} items from your receipt.`,
          });
        } catch (error) {
          console.error("OCR processing error:", error);
          setScanState('idle');
          toast({
            title: "Error scanning receipt",
            description: "Failed to process the receipt. Please try again.",
            variant: "destructive",
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const startCamera = async () => {
    try {
      setScanState('camera');
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      setScanState('idle');
      toast({
        title: "Camera Error",
        description: "Could not access your camera. Please check permissions.",
        variant: "destructive",
      });
    }
  };
  
  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw video frame to canvas
      const context = canvas.getContext('2d');
      context?.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert canvas to data URL
      const imageData = canvas.toDataURL('image/jpeg');
      setPreviewImage(imageData);
      
      // Stop camera stream
      const stream = video.srcObject as MediaStream;
      const tracks = stream?.getTracks();
      tracks?.forEach(track => track.stop());
      
      // Process the image
      setScanState('processing');
      
      // Perform OCR on the captured image
      performOCR(imageData)
        .then(results => {
          setOcrResults(results);
          setScanState('results');
          toast({
            title: "Receipt scanned successfully!",
            description: `Found ${results.items.length} items from your receipt.`,
          });
        })
        .catch(error => {
          console.error("OCR processing error:", error);
          setScanState('idle');
          toast({
            title: "Error scanning receipt",
            description: "Failed to process the receipt. Please try again.",
            variant: "destructive",
          });
        });
    }
  };
  
  const exitCamera = () => {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream?.getTracks();
      tracks?.forEach(track => track.stop());
    }
    setScanState('idle');
  };
  
  const resetScan = () => {
    setScanState('idle');
    setPreviewImage(null);
  };
  
  const addAllItems = () => {
    if (ocrResults) {
      toast({
        title: "Items Added",
        description: `${ocrResults.items.length} items have been added to your inventory.`,
      });
      // In a real app, this would save the items to your inventory
      resetScan();
    }
  };

  return (
    <MobileLayout title="Scan Receipt">
      <div className="p-4 flex flex-col h-full">
        <div className="text-center mb-4">
          <h2 className="text-lg font-medium">Scan Your Receipt</h2>
          <p className="text-sm text-muted-foreground">
            Upload or take a photo of your receipt to add items
          </p>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center">
          {scanState === 'idle' && (
            <div className="space-y-4 w-full max-w-md">
              <Card className="border-dashed border-2 bg-muted/50">
                <CardContent className="py-8 flex flex-col items-center">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                    <FileText className="h-10 w-10 text-primary" />
                  </div>
                  <p className="text-muted-foreground text-center max-w-[240px]">
                    Take a photo or upload an image of your receipt
                  </p>
                </CardContent>
              </Card>
              
              <div className="flex flex-col gap-3">
                <Button className="w-full" onClick={startCamera}>
                  <Camera className="mr-2 h-4 w-4" />
                  Take Photo
                </Button>
                
                <div className="relative">
                  <Button variant="outline" className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Image
                  </Button>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                  />
                </div>
              </div>
            </div>
          )}
          
          {scanState === 'camera' && (
            <div className="w-full">
              <div className="relative">
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline
                  className="w-full rounded-lg border border-gray-200"
                />
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="absolute top-3 right-3 bg-white"
                  onClick={exitCamera}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="mt-4 flex justify-center">
                <Button onClick={takePhoto} className="px-8">
                  <Camera className="mr-2 h-4 w-4" /> Capture
                </Button>
              </div>
              
              <canvas ref={canvasRef} className="hidden" />
            </div>
          )}
          
          {scanState === 'processing' && previewImage && (
            <div className="text-center space-y-4">
              <img 
                src={previewImage} 
                alt="Receipt preview" 
                className="max-h-[300px] mx-auto rounded-md shadow-md" 
              />
              <div className="flex flex-col items-center">
                <p className="mb-2">Processing receipt...</p>
                <div className="w-full max-w-xs bg-gray-200 rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full animate-[progress_2s_ease-in-out]" style={{ width: '70%' }}></div>
                </div>
              </div>
            </div>
          )}
          
          {scanState === 'results' && ocrResults && (
            <div className="w-full max-w-md space-y-4">
              <div className="bg-green-50 p-4 rounded-md border border-green-200 text-center">
                <p className="text-green-700 font-medium">Receipt scanned successfully!</p>
                <p className="text-sm text-green-600">
                  We found {ocrResults.items.length} items from your receipt
                </p>
                {ocrResults.storeName && (
                  <p className="text-xs text-green-600 mt-1">
                    From: {ocrResults.storeName} • {ocrResults.date}
                  </p>
                )}
              </div>
              
              <div className="bg-white rounded-lg border p-4">
                <h3 className="font-medium mb-3">Detected Items</h3>
                <ul className="space-y-2 max-h-60 overflow-y-auto">
                  {ocrResults.items.map((item: any, i: number) => (
                    <li key={i} className="flex items-center justify-between p-2 border-b last:border-0">
                      <div>
                        <span>{item.name}</span>
                        {item.price && (
                          <span className="text-xs text-muted-foreground ml-2">
                            ${item.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <Button variant="ghost" size="sm">Add</Button>
                    </li>
                  ))}
                </ul>
                {ocrResults.items.length > 5 && (
                  <div className="mt-4 text-center">
                    <Button variant="outline" size="sm">
                      View all {ocrResults.items.length} items
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="flex gap-3">
                <Button onClick={resetScan} variant="outline" className="flex-1">Scan Again</Button>
                <Button onClick={addAllItems} className="flex-1">Add All Items</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
}

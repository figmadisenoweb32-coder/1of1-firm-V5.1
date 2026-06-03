"use client"

import { useState, useRef } from "react"
import { 
  Plus, 
  X, 
  Edit3, 
  Trash2, 
  Upload, 
  Image as ImageIcon, 
  Play,
  ChevronDown,
  ShoppingBag,
  Camera,
  Tent,
  Video,
  FileUp
} from "lucide-react"

// ============ FILE UPLOAD HELPER ============
const handleFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

// ============ IMAGE UPLOAD COMPONENT ============
interface ImageUploadProps {
  value: string
  onChange: (value: string) => void
  label: string
  placeholder?: string
  accept?: string
}

function ImageUploadField({ value, onChange, label, placeholder = "https://...", accept = "image/*" }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    setIsUploading(true)
    try {
      const base64 = await handleFileToBase64(file)
      onChange(base64)
    } catch (error) {
      console.error("Error uploading file:", error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div>
      <label className="block text-white/50 text-[10px] tracking-wider mb-2">{label}</label>
      <div className="space-y-2">
        {/* Preview */}
        {value && (
          <div className="relative w-full h-32 rounded-lg overflow-hidden bg-white/5 border border-white/10">
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
            <button 
              onClick={() => onChange("")}
              className="absolute top-2 right-2 w-6 h-6 bg-red-500/80 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors"
            >
              <X className="w-3 h-3 text-white" />
            </button>
          </div>
        )}
        
        {/* Upload Options */}
        <div className="flex gap-2">
          <input
            type="text"
            value={value.startsWith("data:") ? "" : value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-white/5 border border-white/20 rounded-lg py-2.5 px-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-purple-500/50"
          />
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="px-3 py-2.5 bg-purple-500/20 border border-purple-500/50 text-purple-400 rounded-lg hover:bg-purple-500 hover:text-white transition-all disabled:opacity-50 flex items-center gap-1"
          >
            {isUploading ? (
              <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <FileUp className="w-4 h-4" />
            )}
          </button>
        </div>
        <p className="text-white/30 text-[9px]">Pega una URL o sube un archivo local</p>
      </div>
    </div>
  )
}

// ============ INTERFACES ============
interface DripProduct {
  id: string
  drop: string
  name: string
  colorway: string
  price: number
  sizes: string[]
  mainImage: string
  galleryImages: string[]
}

interface VisionArtwork {
  id: string
  number: string
  totalEditions: number
  name: string
  category: string
  type: string
  price: number
  currency: string
  available: boolean
  image: string
}

interface CampInfo {
  number: string
  dates: string
  location: string
}

interface MaisonProduct {
  id: number
  edition: string
  name: string
  color: string
  price: number
  badge: string
  image: string
}

interface BackstageContent {
  id: number
  title: string
  subtitle: string
  duration: string
  image: string
  type: "video" | "image"
}

// ============ INITIAL DATA ============
const initialDripProducts: DripProduct[] = [
  {
    id: "after-midnight-hoodie",
    drop: "DROP 01",
    name: "AFTER MIDNIGHT HOODIE",
    colorway: "BLACK ON BLACK",
    price: 159000,
    sizes: ["S", "M", "L", "XL"],
    mainImage: "https://f005.backblazeb2.com/file/b21of1firm/background/DRIPhome.jpg",
    galleryImages: []
  },
  {
    id: "midnight-tee",
    drop: "DROP 01",
    name: "MIDNIGHT TEE",
    colorway: "WASHED BLACK",
    price: 89000,
    sizes: ["S", "M", "L", "XL", "XXL"],
    mainImage: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    galleryImages: []
  },
  {
    id: "firm-cap",
    drop: "DROP 01",
    name: "1OF1 FIRM CAP",
    colorway: "BLACK EMBOSSED",
    price: 69000,
    sizes: ["ONE SIZE"],
    mainImage: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=80",
    galleryImages: []
  }
]

const initialVisionArtworks: VisionArtwork[] = [
  { id: "silence-peaks", number: "01", totalEditions: 12, name: "SILENCE PEAKS", category: "LANDSCAPES", type: "FINE ART PHOTOGRAPHY", price: 249000, currency: "COP", available: true, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80" },
  { id: "urban-reflections", number: "02", totalEditions: 12, name: "URBAN REFLECTIONS", category: "URBAN", type: "FINE ART PHOTOGRAPHY", price: 229000, currency: "COP", available: true, image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=600&q=80" },
  { id: "ocean-force", number: "03", totalEditions: 12, name: "OCEAN FORCE", category: "BLACK & WHITE", type: "FINE ART PHOTOGRAPHY", price: 219000, currency: "COP", available: true, image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&q=80" },
]

const initialCamps: CampInfo[] = [
  { number: "02", dates: "NOVEMBER 20 - 30, 2026", location: "MEDELLIN, COLOMBIA" },
  { number: "03", dates: "JANUARY 12 - 22, 2027", location: "CARTAGENA, COLOMBIA" },
]

const initialMaisonProducts: MaisonProduct[] = [
  { id: 1, edition: "01 / 12", name: "CLASSIC SWIM SHORTS", color: "ONYX BLACK", price: 89000, badge: "NEW", image: "https://images.unsplash.com/photo-1565693413579-8ff3fdc1b03b?w=600&q=80" },
  { id: 2, edition: "02 / 12", name: "CLASSIC SWIM SHORTS", color: "FOREST GREEN", price: 89000, badge: "NEW", image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&q=80" },
  { id: 3, edition: "03 / 12", name: "CLASSIC SWIM SHORTS", color: "SAND BEIGE", price: 89000, badge: "NEW", image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80" },
]

const initialBackstageContent: BackstageContent[] = [
  { id: 1, title: "LUNA LLENA", subtitle: "BEFORE THE SHOW", duration: "11:32", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80", type: "video" },
  { id: 2, title: "ANIMAL", subtitle: "BACKSTAGE INTERVIEW", duration: "08:47", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80", type: "video" },
  { id: 3, title: "BABADOOK", subtitle: "INSIDE THE DRESSING ROOM", duration: "09:15", image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=400&q=80", type: "video" },
]

const initialGalleryMoments: string[] = [
  "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&q=80",
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&q=80",
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&q=80",
  "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=300&q=80",
  "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&q=80",
]

type UniverseSection = "drip" | "vision" | "camp" | "maison" | "backstage"

export default function AdminUniversePanel() {
  const [activeSection, setActiveSection] = useState<UniverseSection>("drip")
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  
  // State for each section
  const [dripProducts, setDripProducts] = useState<DripProduct[]>(initialDripProducts)
  const [visionArtworks, setVisionArtworks] = useState<VisionArtwork[]>(initialVisionArtworks)
  const [camps, setCamps] = useState<CampInfo[]>(initialCamps)
  const [maisonProducts, setMaisonProducts] = useState<MaisonProduct[]>(initialMaisonProducts)
  const [backstageContent, setBackstageContent] = useState<BackstageContent[]>(initialBackstageContent)
  const [galleryMoments, setGalleryMoments] = useState<string[]>(initialGalleryMoments)

  // Form states
  const [dripForm, setDripForm] = useState<Partial<DripProduct>>({})
  const [visionForm, setVisionForm] = useState<Partial<VisionArtwork>>({})
  const [campForm, setCampForm] = useState<Partial<CampInfo>>({})
  const [maisonForm, setMaisonForm] = useState<Partial<MaisonProduct>>({})
  const [backstageForm, setBackstageForm] = useState<Partial<BackstageContent>>({})
  const [newMomentUrl, setNewMomentUrl] = useState("")
  const [isUploadingMoment, setIsUploadingMoment] = useState(false)
  const momentFileInputRef = useRef<HTMLInputElement>(null)

  const sections = [
    { id: "drip" as const, name: "DRIP", icon: ShoppingBag, description: "Productos de ropa" },
    { id: "vision" as const, name: "VISION GALLERY", icon: Camera, description: "Arte y fotografia" },
    { id: "camp" as const, name: "CAMP", icon: Tent, description: "Campamentos" },
    { id: "maison" as const, name: "MAISON SWIM", icon: ShoppingBag, description: "Productos de playa" },
    { id: "backstage" as const, name: "GOLDEN BACKSTAGE", icon: Video, description: "Fotos y videos" },
  ]

  const openAddModal = () => {
    setEditingItem(null)
    resetForms()
    setShowModal(true)
  }

  const openEditModal = (item: any) => {
    setEditingItem(item)
    if (activeSection === "drip") {
      setDripForm(item)
    } else if (activeSection === "vision") {
      setVisionForm(item)
    } else if (activeSection === "camp") {
      setCampForm(item)
    } else if (activeSection === "maison") {
      setMaisonForm(item)
    } else if (activeSection === "backstage") {
      setBackstageForm(item)
    }
    setShowModal(true)
  }

  const resetForms = () => {
    setDripForm({})
    setVisionForm({})
    setCampForm({})
    setMaisonForm({})
    setBackstageForm({})
    setNewMomentUrl("")
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingItem(null)
    resetForms()
  }

  // DRIP handlers
  const handleSaveDrip = () => {
    if (!dripForm.name || !dripForm.price) return
    if (editingItem) {
      setDripProducts(prev => prev.map(p => p.id === editingItem.id ? { ...p, ...dripForm } as DripProduct : p))
    } else {
      const newProduct: DripProduct = {
        id: `drip-${Date.now()}`,
        drop: dripForm.drop || "DROP 01",
        name: dripForm.name || "",
        colorway: dripForm.colorway || "",
        price: dripForm.price || 0,
        sizes: dripForm.sizes || ["S", "M", "L", "XL"],
        mainImage: dripForm.mainImage || "",
        galleryImages: dripForm.galleryImages || []
      }
      setDripProducts(prev => [...prev, newProduct])
    }
    closeModal()
  }

  const handleDeleteDrip = (id: string) => {
    setDripProducts(prev => prev.filter(p => p.id !== id))
  }

  // VISION handlers
  const handleSaveVision = () => {
    if (!visionForm.name || !visionForm.price) return
    if (editingItem) {
      setVisionArtworks(prev => prev.map(a => a.id === editingItem.id ? { ...a, ...visionForm } as VisionArtwork : a))
    } else {
      const newArtwork: VisionArtwork = {
        id: `vision-${Date.now()}`,
        number: String(visionArtworks.length + 1).padStart(2, "0"),
        totalEditions: visionForm.totalEditions || 12,
        name: visionForm.name || "",
        category: visionForm.category || "LANDSCAPES",
        type: visionForm.type || "FINE ART PHOTOGRAPHY",
        price: visionForm.price || 0,
        currency: "COP",
        available: true,
        image: visionForm.image || ""
      }
      setVisionArtworks(prev => [...prev, newArtwork])
    }
    closeModal()
  }

  const handleDeleteVision = (id: string) => {
    setVisionArtworks(prev => prev.filter(a => a.id !== id))
  }

  // CAMP handlers
  const handleSaveCamp = () => {
    if (!campForm.dates || !campForm.location) return
    if (editingItem) {
      setCamps(prev => prev.map(c => c.number === editingItem.number ? { ...c, ...campForm } as CampInfo : c))
    } else {
      const newCamp: CampInfo = {
        number: String(camps.length + 1).padStart(2, "0"),
        dates: campForm.dates || "",
        location: campForm.location || ""
      }
      setCamps(prev => [...prev, newCamp])
    }
    closeModal()
  }

  const handleDeleteCamp = (number: string) => {
    setCamps(prev => prev.filter(c => c.number !== number))
  }

  // MAISON handlers
  const handleSaveMaison = () => {
    if (!maisonForm.name || !maisonForm.price) return
    if (editingItem) {
      setMaisonProducts(prev => prev.map(p => p.id === editingItem.id ? { ...p, ...maisonForm } as MaisonProduct : p))
    } else {
      const newProduct: MaisonProduct = {
        id: Date.now(),
        edition: maisonForm.edition || `${String(maisonProducts.length + 1).padStart(2, "0")} / 12`,
        name: maisonForm.name || "",
        color: maisonForm.color || "",
        price: maisonForm.price || 0,
        badge: maisonForm.badge || "NEW",
        image: maisonForm.image || ""
      }
      setMaisonProducts(prev => [...prev, newProduct])
    }
    closeModal()
  }

  const handleDeleteMaison = (id: number) => {
    setMaisonProducts(prev => prev.filter(p => p.id !== id))
  }

  // BACKSTAGE handlers
  const handleSaveBackstage = () => {
    if (!backstageForm.title) return
    if (editingItem) {
      setBackstageContent(prev => prev.map(c => c.id === editingItem.id ? { ...c, ...backstageForm } as BackstageContent : c))
    } else {
      const newContent: BackstageContent = {
        id: Date.now(),
        title: backstageForm.title || "",
        subtitle: backstageForm.subtitle || "",
        duration: backstageForm.duration || "00:00",
        image: backstageForm.image || "",
        type: backstageForm.type || "video"
      }
      setBackstageContent(prev => [...prev, newContent])
    }
    closeModal()
  }

  const handleDeleteBackstage = (id: number) => {
    setBackstageContent(prev => prev.filter(c => c.id !== id))
  }

  const handleAddMoment = () => {
    if (!newMomentUrl) return
    setGalleryMoments(prev => [...prev, newMomentUrl])
    setNewMomentUrl("")
  }

  const handleMomentFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    setIsUploadingMoment(true)
    try {
      const base64 = await handleFileToBase64(file)
      setGalleryMoments(prev => [...prev, base64])
    } catch (error) {
      console.error("Error uploading moment:", error)
    } finally {
      setIsUploadingMoment(false)
      if (momentFileInputRef.current) {
        momentFileInputRef.current.value = ""
      }
    }
  }

  const handleDeleteMoment = (index: number) => {
    setGalleryMoments(prev => prev.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    if (activeSection === "drip") handleSaveDrip()
    else if (activeSection === "vision") handleSaveVision()
    else if (activeSection === "camp") handleSaveCamp()
    else if (activeSection === "maison") handleSaveMaison()
    else if (activeSection === "backstage") handleSaveBackstage()
  }

  return (
    <div className="bg-white/5 rounded-xl p-3 sm:p-4 border border-white/10 mt-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full" />
          <h2 className="text-purple-400 text-xs sm:text-sm tracking-[0.2em]">1 OF 1 UNIVERSE</h2>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {sections.map((section) => {
          const Icon = section.icon
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] sm:text-xs tracking-wider transition-all ${
                activeSection === section.id
                  ? "bg-purple-500/20 border border-purple-500/50 text-purple-400"
                  : "bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/20"
              }`}
            >
              <Icon className="w-3 h-3" />
              <span className="hidden sm:inline">{section.name}</span>
              <span className="sm:hidden">{section.name.split(" ")[0]}</span>
            </button>
          )
        })}
      </div>

      {/* Add Button */}
      <button
        onClick={openAddModal}
        className="mb-4 px-3 py-2 border border-purple-500/50 text-purple-400 text-[10px] sm:text-xs tracking-[0.15em] hover:bg-purple-500 hover:text-white transition-all duration-300 flex items-center gap-2 rounded-lg"
      >
        <Plus className="w-3 h-3" />
        AGREGAR {sections.find(s => s.id === activeSection)?.name}
      </button>

      {/* Content List */}
      <div className="space-y-2 max-h-[40vh] overflow-y-auto pr-2">
        {/* DRIP Products */}
        {activeSection === "drip" && dripProducts.map((product) => (
          <div key={product.id} className="flex items-center gap-3 p-2 sm:p-3 bg-white/5 rounded-lg border border-white/10">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden bg-white/10 flex-shrink-0">
              <img src={product.mainImage} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs sm:text-sm truncate">{product.name}</p>
              <p className="text-white/50 text-[10px] sm:text-xs truncate">{product.colorway}</p>
              <p className="text-purple-400 text-[10px] sm:text-xs">${product.price.toLocaleString()} COP</p>
            </div>
            <div className="flex gap-1">
              <button onClick={() => openEditModal(product)} className="p-1.5 text-white/50 hover:text-purple-400 transition-colors">
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => handleDeleteDrip(product.id)} className="p-1.5 text-white/50 hover:text-red-400 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}

        {/* VISION Artworks */}
        {activeSection === "vision" && visionArtworks.map((artwork) => (
          <div key={artwork.id} className="flex items-center gap-3 p-2 sm:p-3 bg-white/5 rounded-lg border border-white/10">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden bg-white/10 flex-shrink-0">
              <img src={artwork.image} alt={artwork.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs sm:text-sm truncate">{artwork.name}</p>
              <p className="text-white/50 text-[10px] sm:text-xs truncate">{artwork.category}</p>
              <p className="text-purple-400 text-[10px] sm:text-xs">${artwork.price.toLocaleString()} COP</p>
            </div>
            <div className="flex gap-1">
              <button onClick={() => openEditModal(artwork)} className="p-1.5 text-white/50 hover:text-purple-400 transition-colors">
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => handleDeleteVision(artwork.id)} className="p-1.5 text-white/50 hover:text-red-400 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}

        {/* CAMP Info */}
        {activeSection === "camp" && camps.map((camp) => (
          <div key={camp.number} className="flex items-center gap-3 p-2 sm:p-3 bg-white/5 rounded-lg border border-white/10">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-purple-400 text-lg sm:text-xl font-bold">{camp.number}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs sm:text-sm truncate">{camp.dates}</p>
              <p className="text-white/50 text-[10px] sm:text-xs truncate">{camp.location}</p>
            </div>
            <div className="flex gap-1">
              <button onClick={() => openEditModal(camp)} className="p-1.5 text-white/50 hover:text-purple-400 transition-colors">
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => handleDeleteCamp(camp.number)} className="p-1.5 text-white/50 hover:text-red-400 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}

        {/* MAISON Products */}
        {activeSection === "maison" && maisonProducts.map((product) => (
          <div key={product.id} className="flex items-center gap-3 p-2 sm:p-3 bg-white/5 rounded-lg border border-white/10">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden bg-white/10 flex-shrink-0">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs sm:text-sm truncate">{product.name}</p>
              <p className="text-white/50 text-[10px] sm:text-xs truncate">{product.color}</p>
              <p className="text-purple-400 text-[10px] sm:text-xs">${product.price.toLocaleString()} COP</p>
            </div>
            <div className="flex gap-1">
              <button onClick={() => openEditModal(product)} className="p-1.5 text-white/50 hover:text-purple-400 transition-colors">
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => handleDeleteMaison(product.id)} className="p-1.5 text-white/50 hover:text-red-400 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}

        {/* BACKSTAGE Content */}
        {activeSection === "backstage" && (
          <>
            <p className="text-white/50 text-[10px] tracking-wider mb-2">VIDEOS Y CONTENIDO EXCLUSIVO</p>
            {backstageContent.map((content) => (
              <div key={content.id} className="flex items-center gap-3 p-2 sm:p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden bg-white/10 flex-shrink-0">
                  <img src={content.image} alt={content.title} className="w-full h-full object-cover" />
                  {content.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Play className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs sm:text-sm truncate">{content.title}</p>
                  <p className="text-white/50 text-[10px] sm:text-xs truncate">{content.subtitle}</p>
                  <p className="text-purple-400 text-[10px] sm:text-xs">{content.duration}</p>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => openEditModal(content)} className="p-1.5 text-white/50 hover:text-purple-400 transition-colors">
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDeleteBackstage(content.id)} className="p-1.5 text-white/50 hover:text-red-400 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}

            {/* Gallery Moments */}
            <p className="text-white/50 text-[10px] tracking-wider mt-4 mb-2">GALERIA DE MOMENTOS</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {galleryMoments.map((url, index) => (
                <div key={index} className="relative group w-16 h-16 sm:w-20 sm:h-20">
                  <img src={url} alt={`Momento ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                  <button 
                    onClick={() => handleDeleteMoment(index)}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newMomentUrl}
                onChange={(e) => setNewMomentUrl(e.target.value)}
                placeholder="URL de imagen..."
                className="flex-1 bg-white/5 border border-white/20 rounded-lg py-2 px-3 text-white text-xs placeholder:text-white/30 focus:outline-none focus:border-purple-500/50"
              />
              <button
                onClick={handleAddMoment}
                className="px-3 py-2 bg-purple-500/20 border border-purple-500/50 text-purple-400 rounded-lg text-xs hover:bg-purple-500 hover:text-white transition-all"
                title="Agregar por URL"
              >
                <Plus className="w-4 h-4" />
              </button>
              <input
                ref={momentFileInputRef}
                type="file"
                accept="image/*,video/*"
                onChange={handleMomentFileUpload}
                className="hidden"
              />
              <button
                onClick={() => momentFileInputRef.current?.click()}
                disabled={isUploadingMoment}
                className="px-3 py-2 bg-purple-500/20 border border-purple-500/50 text-purple-400 rounded-lg text-xs hover:bg-purple-500 hover:text-white transition-all disabled:opacity-50"
                title="Subir archivo local"
              >
                {isUploadingMoment ? (
                  <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <FileUp className="w-4 h-4" />
                )}
              </button>
            </div>
            <p className="text-white/30 text-[9px] mt-1">Pega una URL o sube archivos locales</p>
          </>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0a0a0a] rounded-xl border border-white/10 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <h3 className="text-white text-sm tracking-wider">
                {editingItem ? "EDITAR" : "AGREGAR"} {sections.find(s => s.id === activeSection)?.name}
              </h3>
              <button onClick={closeModal} className="text-white/50 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              {/* DRIP Form */}
              {activeSection === "drip" && (
                <>
                  <div>
                    <label className="block text-white/50 text-[10px] tracking-wider mb-2">NOMBRE</label>
                    <input
                      type="text"
                      value={dripForm.name || ""}
                      onChange={(e) => setDripForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-white/5 border border-white/20 rounded-lg py-2.5 px-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-purple-500/50"
                      placeholder="Nombre del producto"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-white/50 text-[10px] tracking-wider mb-2">DROP</label>
                      <input
                        type="text"
                        value={dripForm.drop || ""}
                        onChange={(e) => setDripForm(prev => ({ ...prev, drop: e.target.value }))}
                        className="w-full bg-white/5 border border-white/20 rounded-lg py-2.5 px-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-purple-500/50"
                        placeholder="DROP 01"
                      />
                    </div>
                    <div>
                      <label className="block text-white/50 text-[10px] tracking-wider mb-2">COLOR</label>
                      <input
                        type="text"
                        value={dripForm.colorway || ""}
                        onChange={(e) => setDripForm(prev => ({ ...prev, colorway: e.target.value }))}
                        className="w-full bg-white/5 border border-white/20 rounded-lg py-2.5 px-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-purple-500/50"
                        placeholder="BLACK ON BLACK"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white/50 text-[10px] tracking-wider mb-2">PRECIO (COP)</label>
                    <input
                      type="number"
                      value={dripForm.price || ""}
                      onChange={(e) => setDripForm(prev => ({ ...prev, price: Number(e.target.value) }))}
                      className="w-full bg-white/5 border border-white/20 rounded-lg py-2.5 px-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-purple-500/50"
                      placeholder="159000"
                    />
                  </div>
                  <ImageUploadField
                    label="IMAGEN PRINCIPAL"
                    value={dripForm.mainImage || ""}
                    onChange={(value) => setDripForm(prev => ({ ...prev, mainImage: value }))}
                    placeholder="https://..."
                  />
                </>
              )}

              {/* VISION Form */}
              {activeSection === "vision" && (
                <>
                  <div>
                    <label className="block text-white/50 text-[10px] tracking-wider mb-2">NOMBRE</label>
                    <input
                      type="text"
                      value={visionForm.name || ""}
                      onChange={(e) => setVisionForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-white/5 border border-white/20 rounded-lg py-2.5 px-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-purple-500/50"
                      placeholder="Nombre de la obra"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-white/50 text-[10px] tracking-wider mb-2">CATEGORIA</label>
                      <select
                        value={visionForm.category || ""}
                        onChange={(e) => setVisionForm(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full bg-white/5 border border-white/20 rounded-lg py-2.5 px-3 text-white text-sm focus:outline-none focus:border-purple-500/50"
                      >
                        <option value="">Seleccionar...</option>
                        <option value="LANDSCAPES">LANDSCAPES</option>
                        <option value="URBAN">URBAN</option>
                        <option value="BLACK & WHITE">BLACK & WHITE</option>
                        <option value="ABSTRACT">ABSTRACT</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-white/50 text-[10px] tracking-wider mb-2">EDICIONES</label>
                      <input
                        type="number"
                        value={visionForm.totalEditions || ""}
                        onChange={(e) => setVisionForm(prev => ({ ...prev, totalEditions: Number(e.target.value) }))}
                        className="w-full bg-white/5 border border-white/20 rounded-lg py-2.5 px-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-purple-500/50"
                        placeholder="12"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white/50 text-[10px] tracking-wider mb-2">PRECIO (COP)</label>
                    <input
                      type="number"
                      value={visionForm.price || ""}
                      onChange={(e) => setVisionForm(prev => ({ ...prev, price: Number(e.target.value) }))}
                      className="w-full bg-white/5 border border-white/20 rounded-lg py-2.5 px-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-purple-500/50"
                      placeholder="249000"
                    />
                  </div>
                  <ImageUploadField
                    label="IMAGEN DE LA OBRA"
                    value={visionForm.image || ""}
                    onChange={(value) => setVisionForm(prev => ({ ...prev, image: value }))}
                    placeholder="https://..."
                  />
                </>
              )}

              {/* CAMP Form */}
              {activeSection === "camp" && (
                <>
                  <div>
                    <label className="block text-white/50 text-[10px] tracking-wider mb-2">FECHAS</label>
                    <input
                      type="text"
                      value={campForm.dates || ""}
                      onChange={(e) => setCampForm(prev => ({ ...prev, dates: e.target.value }))}
                      className="w-full bg-white/5 border border-white/20 rounded-lg py-2.5 px-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-purple-500/50"
                      placeholder="NOVEMBER 20 - 30, 2026"
                    />
                  </div>
                  <div>
                    <label className="block text-white/50 text-[10px] tracking-wider mb-2">UBICACION</label>
                    <input
                      type="text"
                      value={campForm.location || ""}
                      onChange={(e) => setCampForm(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full bg-white/5 border border-white/20 rounded-lg py-2.5 px-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-purple-500/50"
                      placeholder="MEDELLIN, COLOMBIA"
                    />
                  </div>
                </>
              )}

              {/* MAISON Form */}
              {activeSection === "maison" && (
                <>
                  <div>
                    <label className="block text-white/50 text-[10px] tracking-wider mb-2">NOMBRE</label>
                    <input
                      type="text"
                      value={maisonForm.name || ""}
                      onChange={(e) => setMaisonForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-white/5 border border-white/20 rounded-lg py-2.5 px-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-purple-500/50"
                      placeholder="Nombre del producto"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-white/50 text-[10px] tracking-wider mb-2">COLOR</label>
                      <input
                        type="text"
                        value={maisonForm.color || ""}
                        onChange={(e) => setMaisonForm(prev => ({ ...prev, color: e.target.value }))}
                        className="w-full bg-white/5 border border-white/20 rounded-lg py-2.5 px-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-purple-500/50"
                        placeholder="ONYX BLACK"
                      />
                    </div>
                    <div>
                      <label className="block text-white/50 text-[10px] tracking-wider mb-2">BADGE</label>
                      <input
                        type="text"
                        value={maisonForm.badge || ""}
                        onChange={(e) => setMaisonForm(prev => ({ ...prev, badge: e.target.value }))}
                        className="w-full bg-white/5 border border-white/20 rounded-lg py-2.5 px-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-purple-500/50"
                        placeholder="NEW"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white/50 text-[10px] tracking-wider mb-2">PRECIO (COP)</label>
                    <input
                      type="number"
                      value={maisonForm.price || ""}
                      onChange={(e) => setMaisonForm(prev => ({ ...prev, price: Number(e.target.value) }))}
                      className="w-full bg-white/5 border border-white/20 rounded-lg py-2.5 px-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-purple-500/50"
                      placeholder="89000"
                    />
                  </div>
                  <ImageUploadField
                    label="IMAGEN DEL PRODUCTO"
                    value={maisonForm.image || ""}
                    onChange={(value) => setMaisonForm(prev => ({ ...prev, image: value }))}
                    placeholder="https://..."
                  />
                </>
              )}

              {/* BACKSTAGE Form */}
              {activeSection === "backstage" && (
                <>
                  <div>
                    <label className="block text-white/50 text-[10px] tracking-wider mb-2">TITULO</label>
                    <input
                      type="text"
                      value={backstageForm.title || ""}
                      onChange={(e) => setBackstageForm(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full bg-white/5 border border-white/20 rounded-lg py-2.5 px-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-purple-500/50"
                      placeholder="Titulo del contenido"
                    />
                  </div>
                  <div>
                    <label className="block text-white/50 text-[10px] tracking-wider mb-2">SUBTITULO</label>
                    <input
                      type="text"
                      value={backstageForm.subtitle || ""}
                      onChange={(e) => setBackstageForm(prev => ({ ...prev, subtitle: e.target.value }))}
                      className="w-full bg-white/5 border border-white/20 rounded-lg py-2.5 px-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-purple-500/50"
                      placeholder="Descripcion breve"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-white/50 text-[10px] tracking-wider mb-2">DURACION</label>
                      <input
                        type="text"
                        value={backstageForm.duration || ""}
                        onChange={(e) => setBackstageForm(prev => ({ ...prev, duration: e.target.value }))}
                        className="w-full bg-white/5 border border-white/20 rounded-lg py-2.5 px-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-purple-500/50"
                        placeholder="11:32"
                      />
                    </div>
                    <div>
                      <label className="block text-white/50 text-[10px] tracking-wider mb-2">TIPO</label>
                      <select
                        value={backstageForm.type || "video"}
                        onChange={(e) => setBackstageForm(prev => ({ ...prev, type: e.target.value as "video" | "image" }))}
                        className="w-full bg-white/5 border border-white/20 rounded-lg py-2.5 px-3 text-white text-sm focus:outline-none focus:border-purple-500/50"
                      >
                        <option value="video">Video</option>
                        <option value="image">Imagen</option>
                      </select>
                    </div>
                  </div>
                  <ImageUploadField
                    label="IMAGEN / THUMBNAIL"
                    value={backstageForm.image || ""}
                    onChange={(value) => setBackstageForm(prev => ({ ...prev, image: value }))}
                    placeholder="https://..."
                    accept="image/*,video/*"
                  />
                </>
              )}

              {/* Save Button */}
              <button
                onClick={handleSave}
                className="w-full py-3 bg-purple-500 text-white text-sm tracking-wider rounded-lg hover:bg-purple-600 transition-colors"
              >
                {editingItem ? "GUARDAR CAMBIOS" : "AGREGAR"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

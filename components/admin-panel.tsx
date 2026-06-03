"use client"

import { useState } from "react"
import { 
  Calendar, 
  ChevronRight, 
  ChevronDown,
  MapPin,
  Clock,
  Headphones,
  LogOut,
  Check,
  HelpCircle,
  Plus,
  X,
  Upload,
  Image as ImageIcon,
  Lock,
  Edit3,
  Trash2
} from "lucide-react"
import AdminUniversePanel from "./admin-universe-panel"

interface AdminPanelProps {
  onNavigate: (page: string) => void
  onLogout: () => void
}

interface EventOption {
  id: string
  name: string
  subtitle: string
  image: string
  category: "signature" | "weekend"
  isEditable: boolean
  description?: string
  date?: string
  time?: string
  location?: string
  ticketPrice?: string
  vipPrice?: string
  vipNote?: string
  stage?: string
  countdownDate?: string
}

interface NewEventForm {
  name: string
  subtitle: string
  description: string
  date: string
  time: string
  location: string
  ticketPrice: string
  vipPrice: string
  vipNote: string
  stage: string
  image: string
  category: "signature" | "weekend"
  countdownDate: string
}

const initialSignatureEvents: EventOption[] = [
  { id: "babadook", name: "BABADOOK 2026", subtitle: "SEXTO ANIVERSARIO DE 1OF1", image: "https://f005.backblazeb2.com/file/b21of1firm/background/BDsig.png", category: "signature", isEditable: false, description: "6ta Edicion - Sexto aniversario", date: "30 Y 31 DE OCTUBRE", location: "BARRANQUILLA", ticketPrice: "$45.000 COP", vipPrice: "$500.000 COP", vipNote: "NORMALMENTE $700K - $2M", stage: "ETAPA CREYENTES", countdownDate: "2026-10-30T20:00" },
  { id: "luna-llena", name: "LUNA LLENA", subtitle: "RUMBA DE PERREO & REGGAETON", image: "https://f005.backblazeb2.com/file/b21of1firm/background/LLback.png", category: "signature", isEditable: false, description: "Rumba de perreo y reggaeton", location: "BARRANQUILLA", ticketPrice: "$45.000 COP", vipPrice: "$500.000 COP", vipNote: "NORMALMENTE $700K - $2M", stage: "ETAPA CREYENTES", countdownDate: "2026-06-01T21:00" },
  { id: "la-festa", name: "LA FESTA", subtitle: "RUMBA EPICA - CARNAVAL", image: "https://f005.backblazeb2.com/file/b21of1firm/background/LFESTAhome.png", category: "signature", isEditable: false, description: "Rumba epica de carnaval", location: "BARRANQUILLA", ticketPrice: "$45.000 COP", vipPrice: "$500.000 COP", vipNote: "NORMALMENTE $700K - $2M", stage: "ETAPA CREYENTES", countdownDate: "2027-02-15T22:00" },
  { id: "animal", name: "ANIMAL", subtitle: "MAS SALVAJE - +14 SIN ALCOHOL", image: "https://f005.backblazeb2.com/file/b21of1firm/background/ANhome.jpg", category: "signature", isEditable: false, description: "Experiencia mas salvaje +14 sin alcohol", date: "SABADO 17 DE MAYO", location: "DISCOLO NIGHT CLUB, BARRANQUILLA", ticketPrice: "$45.000 COP", vipPrice: "$500.000 COP", vipNote: "NORMALMENTE $700K - $2M", stage: "ETAPA CREYENTES", countdownDate: "2027-05-17T19:00" },
  { id: "celestial", name: "MISS 1 OF 1 CELESTIAL", subtitle: "CERTAMEN DE BELLEZA + AFTER PARTY", image: "https://f005.backblazeb2.com/file/b21of1firm/background/MChome.png", category: "signature", isEditable: false, description: "Certamen de belleza con after party", location: "BARRANQUILLA", ticketPrice: "$45.000 COP", vipPrice: "$500.000 COP", vipNote: "NORMALMENTE $700K - $2M", stage: "ETAPA CREYENTES", countdownDate: "2027-08-01T18:00" },
  { id: "championship", name: "THE 1 OF 1 CHAMPIONSHIP", subtitle: "TORNEO DE ARTES MARCIALES", image: "https://f005.backblazeb2.com/file/b21of1firm/background/CHAMPhome.png", category: "signature", isEditable: false, description: "Torneo de artes marciales", location: "BARRANQUILLA", ticketPrice: "COMING SOON", vipPrice: "COMING SOON", vipNote: "", stage: "", countdownDate: "2027-12-01T17:00" },
]

const initialWeekendEvents: EventOption[] = [
  { id: "weekend-1", name: "WEEKEND EVENTS", subtitle: "WEEKEND EXPERIENCE", image: "https://f005.backblazeb2.com/file/b21of1firm/background/SEhome.jpg", category: "weekend", isEditable: true, description: "Fines de semana increibles", location: "Barranquilla, Colombia", ticketPrice: "$40.000 COP", vipPrice: "$400.000 COP", vipNote: "Mesa VIP 10 personas" },
  { id: "special-edition", name: "SPECIAL EDITION", subtitle: "LIMITED EXPERIENCE", image: "https://f005.backblazeb2.com/file/b21of1firm/background/BThome.png", category: "weekend", isEditable: true, description: "Ediciones limitadas y exclusivas", location: "Barranquilla, Colombia", ticketPrice: "$50.000 COP", vipPrice: "$450.000 COP", vipNote: "Mesa VIP 10 personas" },
]

// Helper para formatear fecha y hora del contador
const formatCountdownDateTime = (dateTimeStr: string): string => {
  if (!dateTimeStr) return ""
  try {
    const date = new Date(dateTimeStr)
    return date.toLocaleString("es-CO", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    })
  } catch {
    return dateTimeStr
  }
}

export default function AdminPanel({ onNavigate, onLogout }: AdminPanelProps) {
  const [selectedEvent, setSelectedEvent] = useState<string>("babadook")
  const [signatureEvents, setSignatureEvents] = useState<EventOption[]>(initialSignatureEvents)
  const [weekendEvents, setWeekendEvents] = useState<EventOption[]>(initialWeekendEvents)
  const [showNewEventModal, setShowNewEventModal] = useState(false)
  const [editingEvent, setEditingEvent] = useState<EventOption | null>(null)
  const [newEventForm, setNewEventForm] = useState<NewEventForm>({
    name: "",
    subtitle: "",
    description: "",
    date: "",
    time: "",
    location: "Barranquilla, Colombia",
    ticketPrice: "",
    vipPrice: "",
    vipNote: "",
    stage: "",
    image: "",
    category: "weekend",
    countdownDate: ""
  })

  const allEvents = [...signatureEvents, ...weekendEvents, { id: "other", name: "OTHER EVENT", subtitle: "TELL US MORE", image: "", category: "weekend" as const, isEditable: false }]
  const selectedEventData = allEvents.find(e => e.id === selectedEvent)

  const handleNewEventChange = (field: keyof NewEventForm, value: string) => {
    setNewEventForm(prev => ({ ...prev, [field]: value }))
  }

  const handleCreateEvent = () => {
    if (!newEventForm.name || !newEventForm.subtitle) return
    
    const newEvent: EventOption = {
      id: `weekend-${Date.now()}`,
      name: newEventForm.name.toUpperCase(),
      subtitle: newEventForm.subtitle.toUpperCase(),
      image: newEventForm.image || "https://f005.backblazeb2.com/file/b21of1firm/background/SEhome.jpg",
      category: "weekend",
      isEditable: true,
      description: newEventForm.description,
      date: newEventForm.date,
      time: newEventForm.time,
      location: newEventForm.location,
      ticketPrice: newEventForm.ticketPrice,
      vipPrice: newEventForm.vipPrice,
      vipNote: newEventForm.vipNote,
      stage: newEventForm.stage
    }
    
    setWeekendEvents(prev => [...prev, newEvent])
    setNewEventForm({
      name: "",
      subtitle: "",
      description: "",
      date: "",
      time: "",
      location: "Barranquilla, Colombia",
      ticketPrice: "",
      vipPrice: "",
      vipNote: "",
      stage: "",
      image: "",
      category: "weekend",
      countdownDate: ""
    })
    setShowNewEventModal(false)
  }

  const handleEditEvent = (event: EventOption) => {
    setEditingEvent(event)
    setNewEventForm({
      name: event.name,
      subtitle: event.subtitle,
      description: event.description || "",
      date: event.date || "",
      time: event.time || "",
      location: event.location || "Barranquilla, Colombia",
      ticketPrice: event.ticketPrice || "",
      vipPrice: event.vipPrice || "",
      vipNote: event.vipNote || "",
      stage: event.stage || "",
      image: event.image,
      category: event.category,
      countdownDate: event.countdownDate || ""
    })
    setShowNewEventModal(true)
  }

  const handleUpdateEvent = () => {
    if (!editingEvent || !newEventForm.name || !newEventForm.subtitle) return
    
    const updatedEvent: EventOption = {
      ...editingEvent,
      name: newEventForm.name.toUpperCase(),
      subtitle: newEventForm.subtitle.toUpperCase(),
      description: newEventForm.description,
      date: newEventForm.date,
      time: newEventForm.time,
      location: newEventForm.location,
      ticketPrice: newEventForm.ticketPrice,
      vipPrice: newEventForm.vipPrice,
      vipNote: newEventForm.vipNote,
      stage: newEventForm.stage,
      countdownDate: newEventForm.countdownDate,
      // Solo actualizar imagen si es weekend event
      image: editingEvent.category === "weekend" ? (newEventForm.image || editingEvent.image) : editingEvent.image
    }
    
    if (editingEvent.category === "signature") {
      setSignatureEvents(prev => prev.map(e => 
        e.id === editingEvent.id ? updatedEvent : e
      ))
    } else {
      setWeekendEvents(prev => prev.map(e => 
        e.id === editingEvent.id ? updatedEvent : e
      ))
    }
    
    setEditingEvent(null)
    setNewEventForm({
      name: "",
      subtitle: "",
      description: "",
      date: "",
      time: "",
      location: "Barranquilla, Colombia",
      ticketPrice: "",
      vipPrice: "",
      vipNote: "",
      stage: "",
      image: "",
      category: "weekend",
      countdownDate: ""
    })
    setShowNewEventModal(false)
  }

  const handleDeleteEvent = (eventId: string) => {
    setWeekendEvents(prev => prev.filter(e => e.id !== eventId))
    if (selectedEvent === eventId) {
      setSelectedEvent("babadook")
    }
  }

  const closeModal = () => {
    setShowNewEventModal(false)
    setEditingEvent(null)
    setNewEventForm({
      name: "",
      subtitle: "",
      description: "",
      date: "",
      time: "",
      location: "Barranquilla, Colombia",
      ticketPrice: "",
      vipPrice: "",
      vipNote: "",
      stage: "",
      image: "",
      category: "weekend",
      countdownDate: ""
    })
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-3 sm:px-4 py-3 sm:py-4 md:px-8 bg-black/90 backdrop-blur-sm border-b border-white/5">
        <button onClick={() => onNavigate("home")} className="cursor-pointer">
          <img 
            src="/logo.png" 
            alt="1 OF 1 FIRM" 
            className="h-6 sm:h-8 md:h-10 w-auto"
          />
        </button>
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="text-amber-500/80 text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] hidden sm:block">VIP ACCESS</span>
          <button
            onClick={onLogout}
            className="text-white/60 hover:text-amber-500 transition-colors p-1.5 sm:p-2"
            aria-label="Logout"
          >
            <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 sm:pt-20 pb-6 sm:pb-8 px-3 sm:px-4 md:px-8">
        {/* Title */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-thin tracking-wider text-white italic">EVENTS REQUEST</h1>
          <button 
            onClick={() => setShowNewEventModal(true)}
            className="mt-3 sm:mt-4 px-3 sm:px-4 py-2 border border-amber-500/50 text-amber-500 text-[10px] sm:text-xs tracking-[0.15em] hover:bg-amber-500 hover:text-black transition-all duration-300 flex items-center gap-2"
          >
            <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
            NUEVO EVENTO
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Left Column - Event Selection */}
          <div className="w-full lg:w-[380px] space-y-3 sm:space-y-4">
            {/* SIGNATURE EVENTS */}
            <div>
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <Lock className="w-3 h-3 text-amber-500/70" />
                <p className="text-amber-500/80 text-[10px] sm:text-xs tracking-[0.2em]">SIGNATURE EVENTS</p>
                <span className="text-white/30 text-[9px] sm:text-[10px] hidden sm:inline">(Foto no editable)</span>
              </div>
              
              <div className="space-y-2 max-h-[25vh] sm:max-h-[30vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-amber-500/30 scrollbar-track-transparent">
                {signatureEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`w-full flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg border transition-all duration-300 ${
                      selectedEvent === event.id 
                        ? "border-amber-500/50 bg-amber-500/5" 
                        : "border-white/10 hover:border-white/20 bg-white/5"
                    }`}
                  >
                    <button
                      onClick={() => setSelectedEvent(event.id)}
                      className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0"
                    >
                      {/* Event Thumbnail */}
                      <div className="relative w-10 h-10 sm:w-14 sm:h-14 rounded-lg overflow-hidden bg-white/10 flex-shrink-0">
                        <img src={event.image} alt={event.name} className="w-full h-full object-cover" />
                        <div className="absolute bottom-0.5 right-0.5">
                          <Lock className="w-2 h-2 sm:w-3 sm:h-3 text-amber-500/70" />
                        </div>
                      </div>
                      
                      {/* Event Info */}
                      <div className="flex-1 text-left min-w-0">
                        <p className="text-white text-xs sm:text-sm tracking-wide truncate">{event.name}</p>
                        <p className="text-amber-500/70 text-[9px] sm:text-[10px] tracking-[0.1em] truncate">{event.subtitle}</p>
                        {event.countdownDate && (
                          <p className="text-white/40 text-[8px] sm:text-[9px] flex items-center gap-1 mt-0.5">
                            <Clock className="w-2.5 h-2.5" />
                            Contador: {formatCountdownDateTime(event.countdownDate)}
                          </p>
                        )}
                      </div>
                    </button>
                    
                    {/* Edit Button */}
                    <button
                      onClick={() => handleEditEvent(event)}
                      className="p-1 sm:p-1.5 rounded-lg text-white/40 hover:text-amber-500 hover:bg-amber-500/10 transition-all flex-shrink-0"
                      title="Editar evento (foto protegida)"
                    >
                      <Edit3 className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                    
                    {/* Selection Indicator */}
                    {selectedEvent === event.id ? (
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
                      </div>
                    ) : (
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white/30 flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* WEEKEND EVENTS */}
            <div>
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <Edit3 className="w-3 h-3 text-green-500/70" />
                <p className="text-green-500/80 text-[10px] sm:text-xs tracking-[0.2em]">WEEKEND EVENTS</p>
                <span className="text-white/30 text-[9px] sm:text-[10px] hidden sm:inline">(Editable)</span>
              </div>
              
              <div className="space-y-2 max-h-[20vh] sm:max-h-[25vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-green-500/30 scrollbar-track-transparent">
                {weekendEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`w-full flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg border transition-all duration-300 ${
                      selectedEvent === event.id 
                        ? "border-green-500/50 bg-green-500/5" 
                        : "border-white/10 hover:border-white/20 bg-white/5"
                    }`}
                  >
                    <button
                      onClick={() => setSelectedEvent(event.id)}
                      className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0"
                    >
                      {/* Event Thumbnail */}
                      <div className="relative w-10 h-10 sm:w-14 sm:h-14 rounded-lg overflow-hidden bg-white/10 flex-shrink-0">
                        {event.image ? (
                          <img src={event.image} alt={event.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon className="w-4 h-4 sm:w-6 sm:h-6 text-white/40" />
                          </div>
                        )}
                      </div>
                      
                      {/* Event Info */}
                      <div className="flex-1 text-left min-w-0">
                        <p className="text-white text-xs sm:text-sm tracking-wide truncate">{event.name}</p>
                        <p className="text-green-500/70 text-[9px] sm:text-[10px] tracking-[0.1em] truncate">{event.subtitle}</p>
                      </div>
                    </button>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
                      <button
                        onClick={() => handleEditEvent(event)}
                        className="p-1 sm:p-1.5 rounded-lg text-white/40 hover:text-green-500 hover:bg-green-500/10 transition-all"
                        title="Editar evento"
                      >
                        <Edit3 className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="p-1 sm:p-1.5 rounded-lg text-white/40 hover:text-red-500 hover:bg-red-500/10 transition-all"
                        title="Eliminar evento"
                      >
                        <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                    
                    {/* Selection Indicator */}
                    {selectedEvent === event.id && (
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
                      </div>
                    )}
                  </div>
                ))}

                {/* Other Event */}
                <button
                  onClick={() => setSelectedEvent("other")}
                  className={`w-full flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg border transition-all duration-300 ${
                    selectedEvent === "other" 
                      ? "border-white/30 bg-white/5" 
                      : "border-white/10 hover:border-white/20 bg-white/5"
                  }`}
                >
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg overflow-hidden bg-white/10 flex-shrink-0 flex items-center justify-center">
                    <HelpCircle className="w-4 h-4 sm:w-6 sm:h-6 text-white/40" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-white text-xs sm:text-sm tracking-wide">OTHER EVENT</p>
                    <p className="text-white/50 text-[9px] sm:text-[10px] tracking-[0.1em]">TELL US MORE</p>
                  </div>
                  {selectedEvent === "other" ? (
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
                    </div>
                  ) : (
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white/30 flex-shrink-0" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="flex-1">
            {/* Event Header Image - Shows selected event */}
            <div className="relative h-28 sm:h-32 md:h-40 rounded-xl overflow-hidden mb-4 sm:mb-6">
              <img
                src={selectedEventData?.image || "https://f005.backblazeb2.com/file/b21of1firm/background/BDsig.png"}
                alt={selectedEventData?.name || "Event"}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4">
                <p className="text-white text-base sm:text-lg md:text-xl font-medium tracking-wide">{selectedEventData?.name}</p>
                <p className="text-amber-500/80 text-[10px] sm:text-xs tracking-[0.1em]">{selectedEventData?.subtitle}</p>
              </div>
              <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4">
                <span className="text-white/60 text-3xl sm:text-4xl md:text-6xl font-thin italic">1OF1</span>
              </div>
              {/* Category Badge */}
              <div className={`absolute top-3 sm:top-4 left-3 sm:left-4 px-2 sm:px-3 py-1 rounded-full text-[9px] sm:text-[10px] tracking-[0.1em] flex items-center gap-1 ${
                selectedEventData?.category === "signature" 
                  ? "bg-amber-500/20 text-amber-500 border border-amber-500/30" 
                  : "bg-green-500/20 text-green-500 border border-green-500/30"
              }`}>
                {selectedEventData?.category === "signature" ? <Lock className="w-2 h-2 sm:w-3 sm:h-3" /> : <Edit3 className="w-2 h-2 sm:w-3 sm:h-3" />}
                {selectedEventData?.category === "signature" ? "SIGNATURE" : "WEEKEND"}
              </div>
            </div>

            {/* Form Content */}
            <div className="bg-white/5 rounded-xl p-3 sm:p-4 md:p-6 border border-white/10">
              {/* Event Information - Shows selected event data */}
              <div className="mb-4 sm:mb-6">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500/70" />
                    <span className="text-white/80 text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em]">EVENT INFORMATION</span>
                  </div>
                  <button
                    onClick={() => selectedEventData && handleEditEvent(selectedEventData)}
                    className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs tracking-[0.1em] flex items-center gap-1 sm:gap-1.5 transition-all ${
                      selectedEventData?.category === "signature"
                        ? "border border-amber-500/30 text-amber-500 hover:bg-amber-500/10"
                        : "border border-green-500/30 text-green-500 hover:bg-green-500/10"
                    }`}
                  >
                    <Edit3 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    EDITAR
                  </button>
                </div>
                
                {/* Selected Event Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4 p-3 sm:p-4 bg-white/5 rounded-lg border border-white/10">
                  <div>
                    <label className="block text-white/40 text-[8px] sm:text-[9px] tracking-[0.15em] mb-1">EVENTO</label>
                    <p className="text-white text-xs sm:text-sm font-medium">{selectedEventData?.name || "-"}</p>
                    <p className="text-amber-500/60 text-[9px] sm:text-[10px]">{selectedEventData?.subtitle || "-"}</p>
                  </div>
                  <div>
                    <label className="block text-white/40 text-[8px] sm:text-[9px] tracking-[0.15em] mb-1">UBICACION</label>
                    <p className="text-white text-xs sm:text-sm">{selectedEventData?.location || "Barranquilla, Colombia"}</p>
                  </div>
                  {selectedEventData?.date && (
                    <div>
                      <label className="block text-white/40 text-[8px] sm:text-[9px] tracking-[0.15em] mb-1">FECHA</label>
                      <p className="text-white text-xs sm:text-sm">{selectedEventData.date}</p>
                    </div>
                  )}
                  {selectedEventData?.stage && (
                    <div>
                      <label className="block text-white/40 text-[8px] sm:text-[9px] tracking-[0.15em] mb-1">ETAPA</label>
                      <p className="text-amber-500 text-xs sm:text-sm">{selectedEventData.stage}</p>
                    </div>
                  )}
                  {selectedEventData?.countdownDate && selectedEventData?.category === "signature" && (
                    <div>
                      <label className="block text-white/40 text-[8px] sm:text-[9px] tracking-[0.15em] mb-1 flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        FECHA Y HORA CONTADOR
                      </label>
                      <p className="text-amber-500 text-xs sm:text-sm font-medium">{formatCountdownDateTime(selectedEventData.countdownDate)}</p>
                    </div>
                  )}
                  {selectedEventData?.description && (
                    <div className="sm:col-span-2">
                      <label className="block text-white/40 text-[8px] sm:text-[9px] tracking-[0.15em] mb-1">DESCRIPCION</label>
                      <p className="text-white/70 text-xs sm:text-sm">{selectedEventData.description}</p>
                    </div>
                  )}
                </div>

                {/* Pricing Details */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 p-3 sm:p-4 bg-white/5 rounded-lg border border-white/10">
                  <div>
                    <label className="block text-white/40 text-[8px] sm:text-[9px] tracking-[0.15em] mb-1">TICKET</label>
                    <p className="text-white text-sm sm:text-lg font-light">{selectedEventData?.ticketPrice || "Consultar"}</p>
                  </div>
                  <div>
                    <label className="block text-white/40 text-[8px] sm:text-[9px] tracking-[0.15em] mb-1">MESA VIP</label>
                    <p className="text-white text-sm sm:text-lg font-light">{selectedEventData?.vipPrice || "Consultar"}</p>
                    {selectedEventData?.vipNote && (
                      <p className="text-white/40 text-[9px] sm:text-[10px]">{selectedEventData.vipNote}</p>
                    )}
                  </div>
                </div>
                
                {/* Event Selector */}
                <div className="mt-3 sm:mt-4">
                  <label className="block text-white/50 text-[9px] sm:text-[10px] tracking-[0.15em] mb-2">SELECCIONAR EVENTO</label>
                  <div className="relative">
                    <select 
                      value={selectedEvent}
                      onChange={(e) => setSelectedEvent(e.target.value)}
                      className="w-full bg-white/5 border border-white/20 rounded-lg py-2.5 sm:py-3 px-3 sm:px-4 text-white text-xs sm:text-sm appearance-none cursor-pointer focus:outline-none focus:border-amber-500/50"
                    >
                      <optgroup label="SIGNATURE EVENTS" className="bg-black text-amber-500">
                        {signatureEvents.map(event => (
                          <option key={event.id} value={event.id} className="bg-black text-white">{event.name}</option>
                        ))}
                      </optgroup>
                      <optgroup label="WEEKEND EVENTS" className="bg-black text-green-500">
                        {weekendEvents.map(event => (
                          <option key={event.id} value={event.id} className="bg-black text-white">{event.name}</option>
                        ))}
                      </optgroup>
                      <option value="other" className="bg-black text-white">OTHER EVENT</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-white/40 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 1 OF 1 UNIVERSE Section */}
        <AdminUniversePanel />
      </main>

      {/* Footer Info Bar */}
      <footer className="py-4 sm:py-6 px-3 sm:px-4 md:px-8 border-t border-white/5">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-white/40" />
              <div>
                <p className="text-white/60 text-[9px] sm:text-[10px] tracking-[0.1em]">RESPONSE TIME</p>
                <p className="text-white text-[10px] sm:text-xs">24 - 48 hours</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-white/40" />
              <div>
                <p className="text-white/60 text-[9px] sm:text-[10px] tracking-[0.1em]">LOCATION</p>
                <p className="text-white text-[10px] sm:text-xs">Barranquilla, Colombia</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Headphones className="w-3 h-3 sm:w-4 sm:h-4 text-white/40" />
              <div>
                <p className="text-white/60 text-[9px] sm:text-[10px] tracking-[0.1em]">VIP SUPPORT</p>
                <p className="text-white text-[10px] sm:text-xs">+57 300 367 6521</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-4 sm:mt-6">
          <div className="flex items-center justify-center gap-2 text-white/40">
            <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            <span className="text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em]">BARRANQUILLA, COLOMBIA</span>
          </div>
          <p className="text-amber-500/60 text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] mt-2">#UNIQUEEXPERIENCE</p>
        </div>
      </footer>

      {/* New/Edit Event Modal */}
      {showNewEventModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0f0f0f] border border-white/10 rounded-t-2xl sm:rounded-2xl w-full sm:max-w-2xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 sticky top-0 bg-[#0f0f0f] z-10">
              <div>
                <h2 className="text-lg sm:text-xl font-thin tracking-wider text-white">
                  {editingEvent ? "EDITAR EVENTO" : "NUEVO EVENTO"}
                </h2>
                <p className="text-white/40 text-[10px] sm:text-xs mt-1">
                  {editingEvent ? "Modifica la informacion del evento" : "Agrega un nuevo evento a Weekend Events"}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="p-1.5 sm:p-2 text-white/40 hover:text-white transition-colors"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* Category Badge */}
              {editingEvent?.category === "signature" ? (
                <div className="flex items-center gap-2 p-2.5 sm:p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                  <Lock className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500" />
                  <span className="text-amber-500 text-[10px] sm:text-xs tracking-[0.1em]">SIGNATURE EVENT</span>
                  <span className="text-white/40 text-[9px] sm:text-[10px] hidden sm:inline">- Foto protegida</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 p-2.5 sm:p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <Edit3 className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                  <span className="text-green-500 text-[10px] sm:text-xs tracking-[0.1em]">WEEKEND EVENT</span>
                  <span className="text-white/40 text-[9px] sm:text-[10px] hidden sm:inline">- Totalmente editable</span>
                </div>
              )}

              {/* Event Image */}
              <div>
                <label className="block text-white/50 text-[9px] sm:text-[10px] tracking-[0.15em] mb-2">
                  IMAGEN DEL EVENTO 
                  {editingEvent?.category === "signature" && (
                    <span className="text-amber-500/60 ml-2">(Protegida)</span>
                  )}
                </label>
                <div className="relative">
                  {editingEvent?.category === "signature" ? (
                    // Signature Event - Image locked
                    <div className="relative h-32 sm:h-40 rounded-xl overflow-hidden">
                      <img src={editingEvent.image} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-black/60 rounded-lg">
                          <Lock className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500" />
                          <span className="text-amber-500 text-[10px] sm:text-xs">Imagen protegida</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Weekend Event - Image editable
                    <>
                      {newEventForm.image ? (
                        <div className="relative h-32 sm:h-40 rounded-xl overflow-hidden">
                          <img src={newEventForm.image} alt="Preview" className="w-full h-full object-cover" />
                          <button
                            onClick={() => handleNewEventChange("image", "")}
                            className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-lg text-white/70 hover:text-red-500 transition-colors"
                          >
                            <X className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="h-32 sm:h-40 border-2 border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-green-500/50 transition-colors cursor-pointer">
                          <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-white/30" />
                          <span className="text-white/40 text-[10px] sm:text-xs">Ingresa URL de imagen</span>
                        </div>
                      )}
                      <input
                        type="text"
                        value={newEventForm.image}
                        onChange={(e) => handleNewEventChange("image", e.target.value)}
                        placeholder="https://ejemplo.com/imagen.jpg"
                        className="mt-2 sm:mt-3 w-full bg-white/5 border border-white/20 rounded-lg py-2.5 sm:py-3 px-3 sm:px-4 text-white text-xs sm:text-sm placeholder:text-white/30 focus:outline-none focus:border-green-500/50"
                      />
                    </>
                  )}
                </div>
              </div>

              {/* Event Name & Subtitle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-white/50 text-[9px] sm:text-[10px] tracking-[0.15em] mb-2">NOMBRE DEL EVENTO *</label>
                  <input
                    type="text"
                    value={newEventForm.name}
                    onChange={(e) => handleNewEventChange("name", e.target.value)}
                    placeholder="Ej: NEON PARTY"
                    className="w-full bg-white/5 border border-white/20 rounded-lg py-2.5 sm:py-3 px-3 sm:px-4 text-white text-xs sm:text-sm placeholder:text-white/30 focus:outline-none focus:border-green-500/50"
                  />
                </div>
                <div>
                  <label className="block text-white/50 text-[9px] sm:text-[10px] tracking-[0.15em] mb-2">SUBTITULO *</label>
                  <input
                    type="text"
                    value={newEventForm.subtitle}
                    onChange={(e) => handleNewEventChange("subtitle", e.target.value)}
                    placeholder="Ej: ELECTRONIC EXPERIENCE"
                    className="w-full bg-white/5 border border-white/20 rounded-lg py-2.5 sm:py-3 px-3 sm:px-4 text-white text-xs sm:text-sm placeholder:text-white/30 focus:outline-none focus:border-green-500/50"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-white/50 text-[9px] sm:text-[10px] tracking-[0.15em] mb-2">DESCRIPCION (OPCIONAL)</label>
                <textarea
                  value={newEventForm.description}
                  onChange={(e) => handleNewEventChange("description", e.target.value)}
                  placeholder="Describe el evento..."
                  rows={3}
                  className="w-full bg-white/5 border border-white/20 rounded-lg py-2.5 sm:py-3 px-3 sm:px-4 text-white text-xs sm:text-sm placeholder:text-white/30 focus:outline-none focus:border-green-500/50 resize-none"
                />
              </div>

              {/* Date, Time & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <label className="block text-white/50 text-[9px] sm:text-[10px] tracking-[0.15em] mb-2">FECHA</label>
                  <input
                    type="text"
                    value={newEventForm.date}
                    onChange={(e) => handleNewEventChange("date", e.target.value)}
                    placeholder="Ej: 30 Y 31 DE OCTUBRE"
                    className="w-full bg-white/5 border border-white/20 rounded-lg py-2.5 sm:py-3 px-3 sm:px-4 text-white text-xs sm:text-sm placeholder:text-white/30 focus:outline-none focus:border-green-500/50"
                  />
                </div>
                <div>
                  <label className="block text-white/50 text-[9px] sm:text-[10px] tracking-[0.15em] mb-2">ETAPA</label>
                  <input
                    type="text"
                    value={newEventForm.stage}
                    onChange={(e) => handleNewEventChange("stage", e.target.value)}
                    placeholder="Ej: ETAPA CREYENTES"
                    className="w-full bg-white/5 border border-white/20 rounded-lg py-2.5 sm:py-3 px-3 sm:px-4 text-white text-xs sm:text-sm placeholder:text-white/30 focus:outline-none focus:border-green-500/50"
                  />
                </div>
                <div>
                  <label className="block text-white/50 text-[9px] sm:text-[10px] tracking-[0.15em] mb-2">UBICACION</label>
                  <input
                    type="text"
                    value={newEventForm.location}
                    onChange={(e) => handleNewEventChange("location", e.target.value)}
                    placeholder="Barranquilla, Colombia"
                    className="w-full bg-white/5 border border-white/20 rounded-lg py-2.5 sm:py-3 px-3 sm:px-4 text-white text-xs sm:text-sm placeholder:text-white/30 focus:outline-none focus:border-green-500/50"
                  />
                </div>
              </div>

              {/* Countdown Date - Solo para Signature Events */}
              {editingEvent?.category === "signature" && (
                <div className="p-3 sm:p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-amber-500" />
                    <label className="text-amber-500 text-[10px] sm:text-xs tracking-[0.15em] font-medium">FECHA Y HORA DEL CONTADOR</label>
                  </div>
                  <input
                    type="datetime-local"
                    value={newEventForm.countdownDate}
                    onChange={(e) => handleNewEventChange("countdownDate", e.target.value)}
                    className="w-full bg-white/5 border border-amber-500/30 rounded-lg py-2.5 sm:py-3 px-3 sm:px-4 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-500/50 [color-scheme:dark]"
                  />
                  <p className="text-white/40 text-[9px] sm:text-[10px] mt-2">
                    Esta fecha y hora se usara para el contador regresivo del evento. El contador mostrara dias, horas, minutos y segundos.
                  </p>
                </div>
              )}

              {/* Pricing */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <label className="block text-white/50 text-[9px] sm:text-[10px] tracking-[0.15em] mb-2">PRECIO TICKET</label>
                  <input
                    type="text"
                    value={newEventForm.ticketPrice}
                    onChange={(e) => handleNewEventChange("ticketPrice", e.target.value)}
                    placeholder="Ej: $45.000 COP"
                    className="w-full bg-white/5 border border-white/20 rounded-lg py-2.5 sm:py-3 px-3 sm:px-4 text-white text-xs sm:text-sm placeholder:text-white/30 focus:outline-none focus:border-green-500/50"
                  />
                </div>
                <div>
                  <label className="block text-white/50 text-[9px] sm:text-[10px] tracking-[0.15em] mb-2">PRECIO MESA VIP</label>
                  <input
                    type="text"
                    value={newEventForm.vipPrice}
                    onChange={(e) => handleNewEventChange("vipPrice", e.target.value)}
                    placeholder="Ej: $500.000 COP"
                    className="w-full bg-white/5 border border-white/20 rounded-lg py-2.5 sm:py-3 px-3 sm:px-4 text-white text-xs sm:text-sm placeholder:text-white/30 focus:outline-none focus:border-green-500/50"
                  />
                </div>
                <div>
                  <label className="block text-white/50 text-[9px] sm:text-[10px] tracking-[0.15em] mb-2">NOTA VIP</label>
                  <input
                    type="text"
                    value={newEventForm.vipNote}
                    onChange={(e) => handleNewEventChange("vipNote", e.target.value)}
                    placeholder="Ej: NORMALMENTE $700K - $2M"
                    className="w-full bg-white/5 border border-white/20 rounded-lg py-2.5 sm:py-3 px-3 sm:px-4 text-white text-xs sm:text-sm placeholder:text-white/30 focus:outline-none focus:border-green-500/50"
                  />
                </div>
              </div>

              {/* Info Note */}
              {editingEvent?.category === "signature" ? (
                <div className="flex items-start gap-2 p-2.5 sm:p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                  <Lock className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-amber-500 text-[10px] sm:text-xs font-medium">Evento Signature - Foto Protegida</p>
                    <p className="text-white/50 text-[9px] sm:text-[10px] mt-1">
                      Puedes editar la informacion del evento pero la imagen principal esta protegida.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-2 p-2.5 sm:p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <Edit3 className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-green-500 text-[10px] sm:text-xs font-medium">Evento Weekend - Totalmente Editable</p>
                    <p className="text-white/50 text-[9px] sm:text-[10px] mt-1">
                      Puedes modificar toda la informacion del evento incluyendo la imagen.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-2 sm:gap-3 p-4 sm:p-6 border-t border-white/10 sticky bottom-0 bg-[#0f0f0f]">
              <button
                onClick={closeModal}
                className="px-4 sm:px-6 py-2.5 sm:py-3 border border-white/20 text-white/70 text-[10px] sm:text-xs tracking-[0.15em] rounded-lg hover:border-white/40 transition-all"
              >
                CANCELAR
              </button>
              <button
                onClick={editingEvent ? handleUpdateEvent : handleCreateEvent}
                disabled={!newEventForm.name || !newEventForm.subtitle}
                className={`px-4 sm:px-6 py-2.5 sm:py-3 text-black text-[10px] sm:text-xs tracking-[0.15em] rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 sm:gap-2 ${
                  editingEvent?.category === "signature"
                    ? "bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400"
                    : "bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400"
                }`}
              >
                <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                {editingEvent ? "GUARDAR" : "CREAR"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

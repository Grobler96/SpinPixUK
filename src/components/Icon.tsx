import {
  Camera, Sparkles, Video, Monitor, Smartphone, PhoneCall,
  Heart, Users, Gift, Clock, Music, Palette, Zap, Cake,
  Building2, BarChart3, Share2, ShieldCheck, Star, GraduationCap,
  Truck, UserCheck, Images, MessageCircle, FileText, CalendarCheck,
  PartyPopper, ChevronDown, Menu, X, ArrowRight, ArrowLeft, Check,
  Phone, Mail, MapPin, Instagram, Facebook, Quote, Play, Pause,
  Volume2, VolumeX, Send, Loader2, AlertCircle, Plus, Minus,
} from 'lucide-react';

const icons: Record<string, React.ComponentType<{ className?: string; size?: number | string }>> = {
  Camera, Sparkles, Video, Monitor, Smartphone, PhoneCall,
  Heart, Users, Gift, Clock, Music, Palette, Zap, Cake,
  Building2, BarChart3, Share2, ShieldCheck, Star, GraduationCap,
  Truck, UserCheck, Images, MessageCircle, FileText, CalendarCheck,
  PartyPopper, ChevronDown, Menu, X, ArrowRight, ArrowLeft, Check,
  Phone, Mail, MapPin, Instagram, Facebook, Quote, Play, Pause,
  Volume2, VolumeX, Send, Loader2, AlertCircle, Plus, Minus,
};

export type IconName = keyof typeof icons;

export function Icon({ name, className, size }: { name: string; className?: string; size?: number | string }) {
  const Cmp = icons[name] ?? Sparkles;
  return <Cmp className={className} size={size} />;
}

import {
  Camera, Sparkles, Video, Monitor, Smartphone, Heart, Users, Clock, Zap, Cake, Building2, Share2,
  ShieldCheck, Star, GraduationCap, Truck, UserCheck, Images, MessageCircle, PartyPopper, ChevronDown,
  Menu, X, ArrowRight, ArrowLeft, Check, Phone, Mail, MapPin, Instagram, Facebook, Send, Loader2,
  AlertCircle, Palette, Briefcase, Wand2, Gift, Plus, Minus,
} from 'lucide-react';

const icons = {
  Camera, Sparkles, Video, Monitor, Smartphone, Heart, Users, Clock, Zap, Cake, Building2, Share2,
  ShieldCheck, Star, GraduationCap, Truck, UserCheck, Images, MessageCircle, PartyPopper, ChevronDown,
  Menu, X, ArrowRight, ArrowLeft, Check, Phone, Mail, MapPin, Instagram, Facebook, Send, Loader2,
  AlertCircle, Palette, Briefcase, Wand2, Gift, Plus, Minus,
};

export function Icon({ name, className, size }: { name: string; className?: string; size?: number }) {
  const Cmp = (icons as Record<string, typeof Camera>)[name] ?? Sparkles;
  return <Cmp className={className} size={size} aria-hidden="true" />;
}

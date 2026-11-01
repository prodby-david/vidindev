export interface MarqueeItemUI {
  id: string;
  src: string;
  caption: string;
  alt: string;
}

export interface AboutMarqueeTabProps {
  initialItems?: MarqueeItemUI[];
  onAdd?: (item: Partial<MarqueeItemUI>) => void;
  onUpdate?: (item: Partial<MarqueeItemUI>) => void;
  onDelete?: (id: string) => void;
  searchQuery?: string;
}

export interface MarqueeModalProps {
  isOpen: boolean;
  item?: MarqueeItemUI | null;
  onClose: () => void;
  onSave: (item: Partial<MarqueeItemUI>) => Promise<void> | void;
}

export interface CertificationItemUI {
  id: string;
  title: string;
  institution: string;
  period: string;
  details: string;
  type?: "degree" | "certification";
  credentialImage: string;
  credentialId?: string | null;
  verificationUrl?: string | null;
}

export interface AboutCertificationsTabProps {
  initialItems?: CertificationItemUI[];
  onAdd?: (item: Partial<CertificationItemUI>) => void;
  onUpdate?: (item: Partial<CertificationItemUI>) => void;
  onDelete?: (id: string) => void;
  searchQuery?: string;
}

export interface CertificationModalProps {
  isOpen: boolean;
  item?: CertificationItemUI | null;
  onClose: () => void;
  onSave: (item: Partial<CertificationItemUI>) => Promise<void> | void;
}

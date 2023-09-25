export interface TipTapProps {
  placeholder?: string;
  content?: string;
  defaultValue?: string;
  editable?: boolean;
  withFloatingMenu?: boolean;
  withBubleMenu?: boolean;
  onChange?: (val: string, text?: string) => void;
  onUploadImageUrl?: (val: string, isPrimary?: boolean) => void;
}

import ShortText from "./fields/ShortText.svelte";
import LongText from "./fields/LongText.svelte";
import Email from "./fields/Email.svelte";
import Phone from "./fields/Phone.svelte";
import Image from "./fields/Image.svelte";
import File from "./fields/File.svelte";
import Checkbox from "./fields/Checkbox.svelte";
import Radio from "./fields/Radio.svelte";
import Member from "./fields/Member.svelte";
import Table from "./fields/Table.svelte";

import { 
  Minus, Text, CheckCircle, CopyCheck, 
  Image as ImageIcon, FileUp, Mail, 
  Phone as PhoneIcon, UsersRound, TableProperties 
} from "lucide-svelte";

export default {
  ShortText: {
    icon: Minus,
    label: "Short Text",
    component: ShortText
  },
  LongText: {
    icon: Text,
    label: "Long Text",
    component: LongText
  },
  Email: {
    icon: Mail,
    label: "Email",
    component: Email
  },
  Phone: {
    icon: PhoneIcon,
    label: "Phone",
    component: Phone
  },
  Image: {
    icon: ImageIcon,
    label: "Image",
    component: Image
  },
  File: {
    icon: FileUp,
    label: "File",
    component: File
  },
  Checkbox: {
    icon: CopyCheck,
    label: "Multiple Choice",
    component: Checkbox
  },
  Radio: {
    icon: CheckCircle,
    label: "Single Choice",
    component: Radio
  },
  Member: {
    icon: UsersRound,
    label: "Team Members",
    component: Member
  },
  Table: {
    icon: TableProperties,
    label: "Table",
    component: Table
  }
}
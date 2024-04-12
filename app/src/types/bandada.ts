interface Group {
  id: string;
  name: string;
  description: string;
  adminId: string;
  treeDepth: number;
  fingerprintDuration: number;
  credentials: null;
  createdAt: string;
  updatedAt: string;
}

export interface Invite {
  code: string;
  group: Group;
  isRedeemed: boolean;
  createdAt: string;
}
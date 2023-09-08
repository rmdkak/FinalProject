export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      BOOKMARKS: {
        Row: {
          created_at: string;
          id: string;
          leftWallpaperId: string;
          rightWallpaperId: string;
          tileId: string;
          userId: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          leftWallpaperId: string;
          rightWallpaperId: string;
          tileId: string;
          userId: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          leftWallpaperId?: string;
          rightWallpaperId?: string;
          tileId?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "BOOKMARKS_leftWallpaperId_fkey";
            columns: ["leftWallpaperId"];
            referencedRelation: "WALLPAPER";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "BOOKMARKS_rightWallpaperId_fkey";
            columns: ["rightWallpaperId"];
            referencedRelation: "WALLPAPER";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "BOOKMARKS_tileId_fkey";
            columns: ["tileId"];
            referencedRelation: "TILE";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "BOOKMARKS_userId_fkey";
            columns: ["userId"];
            referencedRelation: "USERS";
            referencedColumns: ["id"];
          },
        ];
      };
      COMMENTS: {
        Row: {
          commentImg: string | null;
          content: string;
          created_at: string;
          id: string;
          postId: string;
          userId: string;
        };
        Insert: {
          commentImg?: string | null;
          content: string;
          created_at?: string;
          id: string;
          postId: string;
          userId: string;
        };
        Update: {
          commentImg?: string | null;
          content?: string;
          created_at?: string;
          id?: string;
          postId?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "COMMENTS_postId_fkey";
            columns: ["postId"];
            referencedRelation: "POSTS";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "COMMENTS_userId_fkey";
            columns: ["userId"];
            referencedRelation: "USERS";
            referencedColumns: ["id"];
          },
        ];
      };
      FURNITURE: {
        Row: {
          category: string[];
          id: string;
          image: string;
          texture: string;
        };
        Insert: {
          category: string[];
          id?: string;
          image?: string;
          texture?: string;
        };
        Update: {
          category?: string[];
          id?: string;
          image?: string;
          texture?: string;
        };
        Relationships: [];
      };
      POSTLIKES: {
        Row: {
          created_at: string;
          id: string;
          postId: string;
          userId: string[];
        };
        Insert: {
          created_at?: string;
          id?: string;
          postId: string;
          userId: string[];
        };
        Update: {
          created_at?: string;
          id?: string;
          postId?: string;
          userId?: string[];
        };
        Relationships: [
          {
            foreignKeyName: "POSTLIKES_postId_fkey";
            columns: ["postId"];
            referencedRelation: "POSTS";
            referencedColumns: ["id"];
          },
        ];
      };
      POSTS: {
        Row: {
          bookmark: number;
          content: string;
          created_at: string;
          id: string;
          leftColorCode: string | null;
          leftWallpaperId: string | null;
          nickname: string | null;
          postImage: string | null;
          rightColorCode: string | null;
          rightWallpaperId: string | null;
          tileId: string | null;
          title: string;
          userId: string | null;
        };
        Insert: {
          bookmark: number;
          content: string;
          created_at?: string;
          id?: string;
          leftColorCode?: string | null;
          leftWallpaperId?: string | null;
          nickname?: string | null;
          postImage?: string | null;
          rightColorCode?: string | null;
          rightWallpaperId?: string | null;
          tileId?: string | null;
          title: string;
          userId?: string | null;
        };
        Update: {
          bookmark?: number;
          content?: string;
          created_at?: string;
          id?: string;
          leftColorCode?: string | null;
          leftWallpaperId?: string | null;
          nickname?: string | null;
          postImage?: string | null;
          rightColorCode?: string | null;
          rightWallpaperId?: string | null;
          tileId?: string | null;
          title?: string;
          userId?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "POSTS_leftWallpaperId_fkey";
            columns: ["leftWallpaperId"];
            referencedRelation: "WALLPAPER";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "POSTS_rightWallpaperId_fkey";
            columns: ["rightWallpaperId"];
            referencedRelation: "WALLPAPER";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "POSTS_tileId_fkey";
            columns: ["tileId"];
            referencedRelation: "TILE";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "POSTS_userId_fkey";
            columns: ["userId"];
            referencedRelation: "USERS";
            referencedColumns: ["id"];
          },
        ];
      };
      RECOMMENTS: {
        Row: {
          commentId: string;
          content: string;
          created_at: string;
          id: string;
          userId: string;
        };
        Insert: {
          commentId: string;
          content: string;
          created_at?: string;
          id?: string;
          userId: string;
        };
        Update: {
          commentId?: string;
          content?: string;
          created_at?: string;
          id?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "RECOMMENTS_commentId_fkey";
            columns: ["commentId"];
            referencedRelation: "COMMENTS";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "RECOMMENTS_userId_fkey";
            columns: ["userId"];
            referencedRelation: "USERS";
            referencedColumns: ["id"];
          },
        ];
      };
      TILE: {
        Row: {
          category: string[];
          id: string;
          image: string;
          texture: string;
        };
        Insert: {
          category: string[];
          id?: string;
          image: string;
          texture: string;
        };
        Update: {
          category?: string[];
          id?: string;
          image?: string;
          texture?: string;
        };
        Relationships: [];
      };
      USERS: {
        Row: {
          avatar_url: string;
          created_at: string | null;
          email: string;
          id: string;
          idAnswer: string | null;
          idQuestion: string | null;
          name: string;
        };
        Insert: {
          avatar_url: string;
          created_at?: string | null;
          email: string;
          id: string;
          idAnswer?: string | null;
          idQuestion?: string | null;
          name: string;
        };
        Update: {
          avatar_url?: string;
          created_at?: string | null;
          email?: string;
          id?: string;
          idAnswer?: string | null;
          idQuestion?: string | null;
          name?: string;
        };
        Relationships: [];
      };
      WALLPAPER: {
        Row: {
          category: string[];
          id: string;
          image: string;
          texture: string;
        };
        Insert: {
          category: string[];
          id?: string;
          image: string;
          texture: string;
        };
        Update: {
          category?: string[];
          id?: string;
          image?: string;
          texture?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  T extends keyof Database["public"]["Tables"],
  A extends keyof Database["public"]["Tables"][T],
> = Database["public"]["Tables"][T][A];

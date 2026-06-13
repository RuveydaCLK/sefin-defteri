export interface Recipe {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  duration: number; // in minutes
  difficulty: 'Kolay' | 'Orta' | 'Zor';
  servings: number;
  ingredients: string[];
  instructions: string[];
  isFavorite: boolean;
  authorName: string;
  authorAvatar: string;
  rating: number;
  tags: string[];
  dateAdded: string;
}

export interface Category {
  id: string;
  name: string;
  iconName: string; // references lucide icon component name
  color: string; // tailwind bg color
  iconColor: string; // tailwind text color
}

export interface UserProfile {
  name: string;
  email: string;
  bio: string;
  avatar: string;
  recipesCount: number;
  followersCount: string;
  followingCount: number;
  isFollowing: boolean;
}

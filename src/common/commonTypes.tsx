export interface NavigationTypes {
    navigate: (item: string, params?: any) => void;
    replace: (item: string, params?: any) => void;
    goBack: () => void;
    canGoBack: () => boolean;
    reset: (x: {
        index: number,
        routes: Array<{ name?: string, params?: any }>
    }) => void
    addListener:Function
}

export interface Anime {
    id?: string;
    title?: string;
    url?: string;
    image?: string;
    duration?: string;
    japaneseTitle?: string;
    type?: "ONA" | "OVA" | "Special";
    nsfw?: boolean;
    sub?: number;
    dub?: number;
    episodes?: number;
  }
  
  export interface AnimeData {
    currentPage?: number;
    hasNextPage?: boolean;
    totalPages?: number;
    results?: Anime[];
  }
  
  export interface ApiResponse {
    success?: boolean;
    code?: number;
    message?: string;
    data?: AnimeData;
  }
  
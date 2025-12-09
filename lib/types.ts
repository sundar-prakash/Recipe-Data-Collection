export interface Recipe {
    id: number;
    title: string;
    cuisine: string;
    rating: number | null;
    prep_time: number | null;
    cook_time: number | null;
    total_time: number | null;
    description: string;
    nutrients: {
        calories?: string;
        carbohydrateContent?: string;
        cholesterolContent?: string;
        fiberContent?: string;
        proteinContent?: string;
        saturatedFatContent?: string;
        sodiumContent?: string;
        sugarContent?: string;
        fatContent?: string;
        [key: string]: string | undefined;
    };
    continent?: string;
    country_state?: string;
    ingredients?: string[];
    instructions?: string[];
    serves: string;
    url_link?: string;
}

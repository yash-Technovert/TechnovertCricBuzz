import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database

export class Supabase {

    supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpueW9tanVwa2Fmdm53aWxnandzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzYwMjU3NTEsImV4cCI6MTk5MTYwMTc1MX0.tjqB4wu3N4aWutyA095uUQ8sYqfpydjQIbOpBsLa-YU';
    supabaseUrl = 'https://jnyomjupkafvnwilgjws.supabase.co';
    public supabase = createClient(
        this.supabaseUrl!,
        this.supabaseKey!
    );

    async signUp(arg0: { email: string; password: string; }) {
        return await this.supabase.auth.signUp({ email: arg0.email, password: arg0.password });
    }

    async signInWithPassword(arg0: { email: string; password: string; }): Promise<any> {
        return await this.supabase.auth.signInWithPassword({
            email: arg0.email,
            password: arg0.password,
        });
    }
}
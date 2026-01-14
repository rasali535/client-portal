-- Create a profiles table
create table profiles (
  id uuid references auth.users not null primary key,
  full_name text,
  company_name text,
  website_domain text,
  seo_ranking integer default 0,
  health_score integer default 98,
  uptime_percentage decimal(5,2) default 99.99,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table profiles enable row level security;

create policy "Users can view their own profile"
  on profiles for select
  using ( auth.uid() = id );

create policy "Users can update their own profile"
  on profiles for update
  using ( auth.uid() = id );

create policy "Users can insert their own profile"
  on profiles for insert
  with check ( auth.uid() = id );

-- Create a function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, website_domain)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'website_domain');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger the function every time a user is created
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

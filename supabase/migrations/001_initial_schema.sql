create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.countries (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name_ko text not null,
  name_en text,
  description_ko text,
  hero_image_url text,
  seo_title text,
  seo_description text,
  is_active boolean default true,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.cities (
  id uuid primary key default gen_random_uuid(),
  country_id uuid references public.countries(id) on delete cascade,
  slug text not null,
  name_ko text not null,
  name_en text,
  short_description_ko text,
  guide_content_ko text,
  airport_name text,
  best_season text,
  recommended_for text[],
  hero_image_url text,
  seo_title text,
  seo_description text,
  is_active boolean default true,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(country_id, slug)
);

create table public.product_categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name_ko text not null,
  description_ko text,
  sort_order int default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  city_id uuid references public.cities(id) on delete set null,
  category_id uuid references public.product_categories(id) on delete set null,
  slug text unique not null,
  title_ko text not null,
  subtitle_ko text,
  summary_ko text,
  description_ko text,
  itinerary_ko text,
  included_items text[],
  excluded_items text[],
  meeting_point text,
  duration text,
  min_people int default 1,
  max_people int,
  recommended_for text[],
  preparation_items text[],
  caution_items text[],
  cancellation_policy_ko text,
  hero_image_url text,
  gallery_urls text[],
  kakao_cta_message text,
  is_featured boolean default false,
  is_active boolean default true,
  seo_title text,
  seo_description text,
  last_verified_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.product_rates (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references public.products(id) on delete cascade,
  season_name text not null,
  valid_from date not null,
  valid_to date not null,
  currency text not null,
  base_cost numeric(12,2),
  adult_price numeric(12,2),
  child_price numeric(12,2),
  infant_price numeric(12,2),
  exchange_rate numeric(12,4),
  margin_rate numeric(6,4),
  fixed_fee_krw int default 0,
  calculated_price_krw int,
  display_price_krw int,
  price_note_ko text,
  is_active boolean default true,
  approval_status text default 'approved',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  constraint product_rates_valid_dates check (valid_from <= valid_to),
  constraint product_rates_approval_status_check check (approval_status in ('draft', 'pending', 'approved', 'rejected', 'archived'))
);

create table public.hotels (
  id uuid primary key default gen_random_uuid(),
  city_id uuid references public.cities(id) on delete set null,
  slug text unique not null,
  name_ko text not null,
  name_en text,
  star_rating numeric(2,1),
  hotel_type text,
  summary_ko text,
  description_ko text,
  address text,
  hero_image_url text,
  gallery_urls text[],
  amenities text[],
  recommended_for text[],
  nearby_attractions text[],
  is_luxury boolean default false,
  is_contract boolean default false,
  is_family_friendly boolean default false,
  is_active boolean default true,
  seo_title text,
  seo_description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.hotel_rooms (
  id uuid primary key default gen_random_uuid(),
  hotel_id uuid references public.hotels(id) on delete cascade,
  room_type_ko text not null,
  room_type_en text,
  max_occupancy int,
  bed_type text,
  breakfast_included boolean default false,
  room_description_ko text,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.hotel_rates (
  id uuid primary key default gen_random_uuid(),
  hotel_id uuid references public.hotels(id) on delete cascade,
  room_id uuid references public.hotel_rooms(id) on delete cascade,
  season_name text not null,
  valid_from date not null,
  valid_to date not null,
  currency text not null,
  contract_rate numeric(12,2),
  exchange_rate numeric(12,4),
  margin_rate numeric(6,4),
  display_price_krw int,
  cancellation_policy_ko text,
  inventory_status text default 'on_request',
  approval_status text default 'approved',
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  constraint hotel_rates_valid_dates check (valid_from <= valid_to),
  constraint hotel_rates_inventory_status_check check (inventory_status in ('available', 'limited', 'sold_out', 'on_request')),
  constraint hotel_rates_approval_status_check check (approval_status in ('draft', 'pending', 'approved', 'rejected', 'archived'))
);

create table public.faqs (
  id uuid primary key default gen_random_uuid(),
  target_type text not null,
  target_id uuid,
  question_ko text not null,
  answer_ko text not null,
  sort_order int default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  constraint faqs_target_type_check check (target_type in ('home', 'country', 'city', 'product', 'hotel', 'custom_package'))
);

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  target_type text not null,
  target_id uuid,
  customer_name text,
  rating int check(rating >= 1 and rating <= 5),
  review_text_ko text,
  travel_date date,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  constraint reviews_target_type_check check (target_type in ('country', 'city', 'product', 'hotel', 'custom_package'))
);

create table public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  destination_text text,
  start_date date,
  end_date date,
  adults int,
  children int,
  infants int,
  hotel_grade text,
  requested_services text[],
  budget_krw int,
  customer_name text,
  phone text,
  kakao_id text,
  email text,
  message text,
  privacy_agreed boolean default false,
  status text default 'new',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  constraint quote_requests_dates_check check (start_date is null or end_date is null or start_date <= end_date),
  constraint quote_requests_counts_check check (
    coalesce(adults, 0) >= 0 and coalesce(children, 0) >= 0 and coalesce(infants, 0) >= 0
  ),
  constraint quote_requests_status_check check (status in ('new', 'reviewing', 'quoted', 'reserved', 'closed', 'spam'))
);

create table public.price_change_requests (
  id uuid primary key default gen_random_uuid(),
  source text not null,
  source_message text,
  target_type text not null,
  target_id uuid,
  requested_action text,
  parsed_payload jsonb,
  current_snapshot jsonb,
  proposed_snapshot jsonb,
  status text default 'pending',
  requested_by text,
  approved_by text,
  approved_at timestamptz,
  rejected_reason text,
  preview_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  constraint price_change_requests_source_check check (source in ('admin', 'openclaw', 'provider', 'manual')),
  constraint price_change_requests_target_type_check check (target_type in ('product_rate', 'hotel_rate', 'product', 'hotel')),
  constraint price_change_requests_status_check check (status in ('pending', 'approved', 'rejected', 'applied', 'cancelled'))
);

create table public.price_change_logs (
  id uuid primary key default gen_random_uuid(),
  request_id uuid references public.price_change_requests(id) on delete set null,
  target_type text not null,
  target_id uuid,
  old_value jsonb,
  new_value jsonb,
  changed_by text,
  change_reason text,
  created_at timestamptz default now(),
  constraint price_change_logs_target_type_check check (target_type in ('product_rate', 'hotel_rate', 'product', 'hotel'))
);

create table public.external_providers (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  provider_type text not null,
  is_active boolean default false,
  config_public jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  constraint external_providers_type_check check (provider_type in ('hotel', 'flight', 'activity', 'transfer', 'mixed'))
);

create table public.external_products (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid references public.external_providers(id) on delete cascade,
  external_id text not null,
  city_id uuid references public.cities(id) on delete set null,
  product_type text,
  title_ko text,
  raw_payload jsonb,
  mapped_payload jsonb,
  is_active boolean default false,
  last_synced_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(provider_id, external_id)
);

create index countries_active_idx on public.countries (is_active, sort_order);
create index countries_slug_idx on public.countries (slug);
create index cities_country_active_idx on public.cities (country_id, is_active, sort_order);
create index cities_slug_idx on public.cities (slug);
create index product_categories_active_idx on public.product_categories (is_active, sort_order);
create index products_city_idx on public.products (city_id);
create index products_category_idx on public.products (category_id);
create index products_active_idx on public.products (is_active, is_featured);
create index products_slug_idx on public.products (slug);
create index product_rates_product_valid_idx on public.product_rates (product_id, valid_from, valid_to);
create index product_rates_active_approval_idx on public.product_rates (is_active, approval_status);
create index hotels_city_idx on public.hotels (city_id);
create index hotels_active_idx on public.hotels (is_active, is_contract, is_luxury, is_family_friendly);
create index hotels_slug_idx on public.hotels (slug);
create index hotel_rooms_hotel_active_idx on public.hotel_rooms (hotel_id, is_active);
create index hotel_rates_hotel_valid_idx on public.hotel_rates (hotel_id, valid_from, valid_to);
create index hotel_rates_room_valid_idx on public.hotel_rates (room_id, valid_from, valid_to);
create index hotel_rates_active_approval_idx on public.hotel_rates (is_active, approval_status);
create index faqs_target_idx on public.faqs (target_type, target_id, is_active, sort_order);
create index reviews_target_idx on public.reviews (target_type, target_id, is_active);
create index quote_requests_status_created_idx on public.quote_requests (status, created_at desc);
create index price_change_requests_status_idx on public.price_change_requests (status, created_at desc);
create index price_change_requests_target_idx on public.price_change_requests (target_type, target_id);
create index price_change_logs_request_idx on public.price_change_logs (request_id);
create index external_providers_active_idx on public.external_providers (provider_type, is_active);
create index external_products_provider_idx on public.external_products (provider_id, external_id);
create index external_products_city_idx on public.external_products (city_id, is_active);

create trigger set_countries_updated_at before update on public.countries for each row execute function public.set_updated_at();
create trigger set_cities_updated_at before update on public.cities for each row execute function public.set_updated_at();
create trigger set_product_categories_updated_at before update on public.product_categories for each row execute function public.set_updated_at();
create trigger set_products_updated_at before update on public.products for each row execute function public.set_updated_at();
create trigger set_product_rates_updated_at before update on public.product_rates for each row execute function public.set_updated_at();
create trigger set_hotels_updated_at before update on public.hotels for each row execute function public.set_updated_at();
create trigger set_hotel_rooms_updated_at before update on public.hotel_rooms for each row execute function public.set_updated_at();
create trigger set_hotel_rates_updated_at before update on public.hotel_rates for each row execute function public.set_updated_at();
create trigger set_faqs_updated_at before update on public.faqs for each row execute function public.set_updated_at();
create trigger set_reviews_updated_at before update on public.reviews for each row execute function public.set_updated_at();
create trigger set_quote_requests_updated_at before update on public.quote_requests for each row execute function public.set_updated_at();
create trigger set_price_change_requests_updated_at before update on public.price_change_requests for each row execute function public.set_updated_at();
create trigger set_external_providers_updated_at before update on public.external_providers for each row execute function public.set_updated_at();
create trigger set_external_products_updated_at before update on public.external_products for each row execute function public.set_updated_at();

alter table public.countries enable row level security;
alter table public.cities enable row level security;
alter table public.product_categories enable row level security;
alter table public.products enable row level security;
alter table public.product_rates enable row level security;
alter table public.hotels enable row level security;
alter table public.hotel_rooms enable row level security;
alter table public.hotel_rates enable row level security;
alter table public.faqs enable row level security;
alter table public.reviews enable row level security;
alter table public.quote_requests enable row level security;
alter table public.price_change_requests enable row level security;
alter table public.price_change_logs enable row level security;
alter table public.external_providers enable row level security;
alter table public.external_products enable row level security;

create policy "public read active countries"
on public.countries for select
to anon, authenticated
using (is_active = true);

create policy "public read active cities"
on public.cities for select
to anon, authenticated
using (is_active = true);

create policy "public read active product categories"
on public.product_categories for select
to anon, authenticated
using (is_active = true);

create policy "public read active products"
on public.products for select
to anon, authenticated
using (is_active = true);

create policy "public read active approved product rates"
on public.product_rates for select
to anon, authenticated
using (is_active = true and approval_status = 'approved');

create policy "public read active hotels"
on public.hotels for select
to anon, authenticated
using (is_active = true);

create policy "public read active hotel rooms"
on public.hotel_rooms for select
to anon, authenticated
using (is_active = true);

create policy "public read active approved hotel rates"
on public.hotel_rates for select
to anon, authenticated
using (is_active = true and approval_status = 'approved');

create policy "public read active faqs"
on public.faqs for select
to anon, authenticated
using (is_active = true);

create policy "public read active reviews"
on public.reviews for select
to anon, authenticated
using (is_active = true);

create policy "public insert quote requests"
on public.quote_requests for insert
to anon, authenticated
with check (privacy_agreed = true);

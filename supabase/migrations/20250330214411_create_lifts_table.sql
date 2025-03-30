create table public.lifts (
    id bigint primary key generated always as identity,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    lift_category_id BIGINT REFERENCES public.lift_category(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    weight_lifted NUMERIC(5,2) NOT NULL
);

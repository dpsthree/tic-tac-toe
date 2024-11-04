-- Create tables first
create table public.players (
    id uuid references auth.users on delete cascade primary key,
    name text not null,
    avatar text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    stats jsonb default '{"wins": 0, "losses": 0, "draws": 0}'::jsonb not null,
    constraint players_name_length check (char_length(name) >= 2 and char_length(name) <= 20)
);

create table public.games (
    id uuid default gen_random_uuid() primary key,
    player1_id uuid references public.players not null,
    player2_id uuid references public.players,
    current_state text[] default array_fill(null::text, array[9]) not null,
    next_move text default 'X' not null,
    winner_id uuid references public.players,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    status text default 'waiting' not null,
    constraint games_next_move_check check (next_move in ('X', 'O')),
    constraint games_status_check check (status in ('waiting', 'active', 'completed'))
);

create table public.moves (
    id uuid default gen_random_uuid() primary key,
    game_id uuid references public.games not null,
    player_id uuid references public.players not null,
    position integer not null,
    symbol text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    constraint moves_position_check check (position >= 0 and position < 9),
    constraint moves_symbol_check check (symbol in ('X', 'O'))
);

-- Enable RLS after tables are created
alter table public.players enable row level security;
alter table public.games enable row level security;
alter table public.moves enable row level security;

-- Create indexes
create index players_name_idx on public.players (name);
create index games_status_idx on public.games (status);
create index games_player1_id_idx on public.games (player1_id);
create index games_player2_id_idx on public.games (player2_id);
create index moves_game_id_idx on public.moves (game_id);

-- Create RLS policies
create policy "Users can read all players"
    on public.players for select
    using (true);

create policy "Users can update their own player"
    on public.players for update
    using (auth.uid() = id);

create policy "Users can read all games"
    on public.games for select
    using (true);

create policy "Users can create games"
    on public.games for insert
    with check (auth.uid() = player1_id);

create policy "Players can update their games"
    on public.games for update
    using (auth.uid() in (player1_id, player2_id));

create policy "Users can read all moves"
    on public.moves for select
    using (true);

create policy "Players can create moves in their games"
    on public.moves for insert
    with check (
        exists (
            select 1 from public.games
            where id = game_id
            and auth.uid() in (player1_id, player2_id)
        )
    );

-- Create functions
create or replace function handle_new_user()
returns trigger as $$
begin
    insert into public.players (id, name, avatar)
    values (new.id, new.raw_user_meta->>'name', '😀');
    return new;
end;
$$ language plpgsql security definer;

-- Create trigger for new users
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure handle_new_user();
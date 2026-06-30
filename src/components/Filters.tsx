type filterProps = {
    onFilterChange: (newFilter: string) => void;
}

export function Filters(props: filterProps) {
    return (
        <div>
            <select onChange={(e) => props.onFilterChange(e.target.value)}>
                <option value='All'>All</option>
                <option value='potion'>Potions</option>
                <option value='weapon'>Weapons</option>
                <option value='poison'>Poisons</option>
                <option value='shield'>Shields</option>
            </select>
        </div>
    )
}
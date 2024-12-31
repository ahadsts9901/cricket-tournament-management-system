import { useEffect } from "react"
import { Team } from "../types"

const Fixtures = ({ state, set_state }: any) => {

    const generateMatches = (teams: Team[]) => {
        const matches: { team1: Team; team2: Team }[] = [];

        for (let i = 0; i < teams.length; i++) {
            for (let j = i + 1; j < teams.length; j++) {
                const newMatch = { team1: teams[i], team2: teams[j] };

                const matchExists = matches.some(match =>
                    (match.team1.id === newMatch.team1.id && match.team2.id === newMatch.team2.id) ||
                    (match.team1.id === newMatch.team2.id && match.team2.id === newMatch.team1.id)
                );

                if (!matchExists) {
                    matches.push(newMatch);
                }
            }
        }

        return matches;
    };

    const sortMatches = (matches: { team1: Team; team2: Team }[]) => {
        const sorted: { team1: Team; team2: Team }[] = [];

        const schedule: { team1: Team; team2: Team }[] = [];

        for (let i = 0; i < matches.length; i++) {
            const match = matches[i];
            schedule.push(match);
        }

        let index = 0;
        while (index < schedule.length) {
            const match = schedule[index];

            if (sorted.length === 0 || (sorted[sorted.length - 1].team1.id !== match.team1.id && sorted[sorted.length - 1].team1.id !== match.team2.id)) {
                sorted.push(match);
                index++;
            } else {
                schedule.push(match);
                index++;
            }
        }

        return sorted;
    };

    const shuffleArray = (array: any[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    return (
        <div className="w-full flex flex-col gap-2">
            <h2 className="w-full text-left uppercase tracking-[4px] text-purple-700 text-2xl mb-2">Fixtures</h2>
        </div>
    )
}

export default Fixtures
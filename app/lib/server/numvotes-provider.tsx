"use client"

import { POSITIONS } from "@/types/api-vote";
import { ReactNode, createContext, useContext, useEffect, useState } from "react"

export const useNumVotesContext = () => {
  return useContext(NumVotesContext);
}

type resProps = {
    ID: number,
    Vote: string | null,
    VoteTime: Date | null
}[]

export interface propsType {
    totalVotes: number,
    startTime: string,
    endTime: string,
    data: {
        Position: string;
        labels: string[];
        results: number[];
    }[];
}

type timeProps = {
    StartTime: string | null;
    EndTime: string | null;
} | null

const initialState: propsType = {
    totalVotes: 0,
    startTime: '00',
    endTime: '00',
    data: [
        {
            Position: '',
            labels: [''],
            results: [0]
        }
    ]
}


const NumVotesContext = createContext<propsType>(initialState)
// candidates
let presidents: string[] = [];
let presidentsData: number[] = [];

let vicePresidents: string[] = [];
let vicePresidentsData: number[] = [];

let genSecs: string[] = [];
let genSecsData: number[] = [];

let asstGenSecs: string[] = [];
let asstGenSecsData: number[] = [];

let finSecs: string[] = [];
let finSecsData: number[] = [];

let welfareSecs: string[] = [];
let welfareSecsData: number[] = [];

let socSecs: string[] = [];
let socSecsData: number[] = [];

let sportDirs: string[] = [];
let sportDirsData: number[] = [];

let softwares: string[] = [];
let softwaresData: number[] = [];

let pros: string[] = [];
let prosData: number[] = [];
/*$
[
    {
        ID: 0,
        Vote: ['', '', ...]
    },
    {
        ID: 1,
        Vote: ['', '', ...]
    }
]

[president, vicePresident, genSec, asstGenSec, finSec, welfareSec, socSec, sportDir, software, pro]
*/
// {
//     ID: number,
//     Vote: string | null, => string[]
//     VoteTime: Date | null
// }[]

// provider component
export const NumVotesProvider = ({ valuePass, getTime, children }: { valuePass: resProps, getTime: timeProps, children: ReactNode }) => {
    const [stdState, setState] = useState<propsType>();
    const res = valuePass;
    // let timeHolder = getTime;
    let StartTime = '00';
    let EndTime = '00';
    if (getTime !== null) {
        StartTime = getTime.StartTime!;
        EndTime = getTime.EndTime!;
    }
    
    let resLen = res.length; // Sending...

    useEffect(() => {
        for (let m = 0; m < resLen; m++) {
            const perSon: string[] = JSON.parse(res[m].Vote!)
            for (let n = 0; n < perSon.length; n++) {
                switch (n) {
                    case 0:
                        if (perSon[0].length !== 0) presidents.push(perSon[0]);
                        break;
                        // 0 [elitech, elitech, joshua, ...]
                    case 1:
                        if (perSon[1].length !== 0) vicePresidents.push(perSon[1]);
                        break;
                        // 1 [flourish, joselin, joselin, ...]
                    case 2:
                        if (perSon[2].length !== 0) genSecs.push(perSon[2]);
                        break;
                    case 3:
                        if (perSon[3].length !== 0) asstGenSecs.push(perSon[3]);
                        break;
                    case 4:
                        if (perSon[4].length !== 0) finSecs.push(perSon[4]);
                        break;
                    case 5:
                        if (perSon[5].length !== 0) welfareSecs.push(perSon[5]);
                        break;
                    case 6:
                        if (perSon[6].length !== 0) socSecs.push(perSon[6]);
                        break;
                    case 7:
                        if (perSon[7].length !== 0) sportDirs.push(perSon[7]);
                        break;
                    case 8:
                        if (perSon[8].length !== 0) softwares.push(perSon[8]);
                        break;
                    case 9:
                        if (perSon[9].length !== 0) pros.push(perSon[9]);
                        break;
                    default:
                        break;
                }
            }
        }

        const _presidents = new Set(presidents)
        const _arrayPresidents = Array.from(_presidents);// [elitech, joshua, ...] sending...
        for (let p = 0; p < _arrayPresidents.length; p++) {
            const presidentVotes = presidents.filter((val) => val === _arrayPresidents[p])
            presidentsData.push(presidentVotes.length) // sending...
            // presidentsData[p] = presidentVotes.length // sending...
        }
        
        const _vicePresidents = new Set(vicePresidents)
        const _arrayVicePresidents = Array.from(_vicePresidents);// [flourish, joselin, ...] sending...
        for (let p = 0; p < _arrayVicePresidents.length; p++) {
            const vicePresidentVotes = vicePresidents.filter((val) => val === _arrayVicePresidents[p])
            vicePresidentsData.push(vicePresidentVotes.length) // sending...
            // vicePresidentsData[p] = vicePresidentVotes.length // sending...
        }
        
        const _genSecs = new Set(genSecs)
        const _arrayGenSecs = Array.from(_genSecs);// sending...
        for (let p = 0; p < _arrayGenSecs.length; p++) {
            const genSecsVotes = genSecs.filter((val) => val === _arrayGenSecs[p])
            genSecsData.push(genSecsVotes.length) // sending...
            // genSecsData[p] = genSecsVotes.length // sending...
        }

        const _asstGenSecs = new Set(asstGenSecs)
        const _arrayAsstGenSecs = Array.from(_asstGenSecs);// sending...
        for (let p = 0; p < _arrayAsstGenSecs.length; p++) {
            const asstGenSecsVotes = asstGenSecs.filter((val) => val === _arrayAsstGenSecs[p])
            asstGenSecsData.push(asstGenSecsVotes.length) // sending...
            // asstGenSecsData[p] = asstGenSecsVotes.length // sending...
        }
        
        const _finSecs = new Set(finSecs)
        const _arrayFinSecs = Array.from(_finSecs);// sending...
        for (let p = 0; p < _arrayFinSecs.length; p++) {
            const finSecsVotes = finSecs.filter((val) => val === _arrayFinSecs[p])
            finSecsData.push(finSecsVotes.length) // sending...
            // finSecsData[p] = finSecsVotes.length // sending...
        }
        
        const _welfareSecs = new Set(welfareSecs)
        const _arrayWelfareSecs = Array.from(_welfareSecs);// sending...
        for (let p = 0; p < _arrayWelfareSecs.length; p++) {
            const welfareSecsVotes = welfareSecs.filter((val) => val === _arrayWelfareSecs[p])
            welfareSecsData.push(welfareSecsVotes.length) // sending...
            // welfareSecsData[p] = welfareSecsVotes.length // sending...
        }

        const _socSecs = new Set(socSecs)
        const _arraySocSecs = Array.from(_socSecs);// sending...
        for (let p = 0; p < _arraySocSecs.length; p++) {
            const socSecsVotes = socSecs.filter((val) => val === _arraySocSecs[p])
            socSecsData.push(socSecsVotes.length) // sending...
            // socSecsData[p] = socSecsVotes.length // sending...
        }

        const _sportDirs = new Set(sportDirs)
        const _arraySportDirs = Array.from(_sportDirs);// sending...
        for (let p = 0; p < _arraySportDirs.length; p++) {
            const sportDirsVotes = sportDirs.filter((val) => val === _arraySportDirs[p])
            sportDirsData.push(sportDirsVotes.length) // sending...
            // sportDirsData[p] = sportDirsVotes.length // sending...
        }

        const _softwares = new Set(softwares)
        const _arraySoftwares = Array.from(_softwares);// sending...
        for (let p = 0; p < _arraySoftwares.length; p++) {
            const softwaresVotes = softwares.filter((val) => val === _arraySoftwares[p])
            softwaresData.push(softwaresVotes.length) // sending...
            // softwaresData[p] = softwaresVotes.length // sending...
        }

        const _pros = new Set(pros)
        const _arrayPros = Array.from(_pros);// sending...
        for (let p = 0; p < _arrayPros.length; p++) {
            const prosVotes = pros.filter((val) => val === _arrayPros[p])
            prosData.push(prosVotes.length) // sending...
            // prosData[p] = prosVotes.length // sending...
        }

        let objArr: propsType = {
            totalVotes: resLen,
            startTime: StartTime,
            endTime: EndTime,
            data: [
                {
                    Position: POSITIONS[3],
                    labels: _arrayPresidents,
                    results: presidentsData
                }, {
                    Position: POSITIONS[8],
                    labels: _arrayVicePresidents,
                    results: vicePresidentsData
                }, {
                    Position: POSITIONS[2],
                    labels: _arrayGenSecs,
                    results: genSecsData
                }, {
                    Position: POSITIONS[0],
                    labels: _arrayAsstGenSecs,
                    results: asstGenSecsData
                }, {
                    Position: POSITIONS[1],
                    labels: _arrayFinSecs,
                    results: finSecsData
                }, {
                    Position: POSITIONS[9],
                    labels: _arrayWelfareSecs,
                    results: welfareSecsData
                }, {
                    Position: POSITIONS[5],
                    labels: _arraySocSecs,
                    results: socSecsData
                }, {
                    Position: POSITIONS[7],
                    labels: _arraySportDirs,
                    results: sportDirsData
                }, {
                    Position: POSITIONS[6],
                    labels: _arraySoftwares,
                    results: softwaresData
                }, {
                    Position: POSITIONS[4],
                    labels: _arrayPros,
                    results: prosData
                }
            ]
        }
        console.log("done ", objArr);
        if(objArr) setState(objArr);

    }, [])
    
    return (
        <>
            {
                (stdState) ?
                <NumVotesContext.Provider value={stdState}>
                    { children }
                </NumVotesContext.Provider>
                :
                <>
                    { children }
                </>
            }
        </>
    );
}
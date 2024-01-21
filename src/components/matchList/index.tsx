import axios from 'axios';
import "./style.scss"
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import { MatchListModel, Rate, RateDetail } from '../../models/match';
import { useEffect, useState } from 'react';
import React from 'react';
import CouponDetail from '../couponDetail';
import { useMatchContext } from '../MatchContext';

function MatchList() {

    const {
        selectedMatch,
        setSelectedMatch,
        selectedMatchInfo,
        setSelectedMatchInfo,
        setTotalMatchResult,
    } = useMatchContext();

    const [matchList, setMatchList] = useState<MatchListModel[] | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [visibleMatches, setVisibleMatches] = React.useState<MatchListModel[]>([]);
    const pageSize = 30;


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<MatchListModel[]>('https://nesine-case-study.onrender.com/bets');
                setMatchList(response.data);
                setVisibleMatches(response.data.slice(0, pageSize));
                setIsLoading(false);
            } catch (error) {
                console.error('Veriler çekilirken bir hata oluştu.:', error);
                setIsLoading(true);
            }
        };
        fetchData();
    }, []);

    const handleLoadMore = () => {
        const currentLength = visibleMatches.length;
        const nextBatch = matchList?.slice(currentLength, currentLength + pageSize);
        if (nextBatch) {
            setVisibleMatches((prevMatches) => [...prevMatches, ...nextBatch]);
        }
    };

    const handleScroll = () => {
        const scrollThreshold = 300;
        const isAtBottom =
            window.innerHeight + document.documentElement.scrollTop + scrollThreshold >=
            document.documentElement.scrollHeight;

        if (isAtBottom) {
            handleLoadMore();
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [visibleMatches]);


    const addSelectedMatch = (
        MatchValue: { rate: number; mbs: string; matchInfo: { C: string; N: string } },
        matchInfo: { C: string; N: string }
    ) => {
        const isMatchSelected = selectedMatch.some(
            (selectMatch: any) =>
                selectMatch.matchInfo.C === matchInfo.C && selectMatch.rate === MatchValue.rate
        );

        let updatedMatchs;
        let selectedMatchProduct;

        if (isMatchSelected) {
            updatedMatchs = selectedMatch.filter(
                (value: any) => !(value.matchInfo.C === matchInfo.C && value.rate === MatchValue.rate)
            );
        } else {
            updatedMatchs = selectedMatch.filter(
                (value: any) =>
                    value.matchInfo.C !== matchInfo.C ||
                    value.matchInfo.C.includes('O') !== MatchValue.matchInfo.C.includes('O')
            );
            updatedMatchs = [...updatedMatchs, MatchValue];
        }

        selectedMatchProduct = updatedMatchs.reduce((acc: any, curr: any) => acc * curr.rate, 1);

        const result = selectedMatchProduct.toFixed(2);
        setTotalMatchResult(Number(result));
        setSelectedMatch(updatedMatchs);
        setSelectedMatchInfo(matchInfo);
    };

    return (
        <>
            {isLoading ?
                <div className="loading">
                    <span className="loader"></span>
                </div>
                :
                <>
                    <div className='match-list'>
                        {visibleMatches && (
                            <>
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            {[`Event Count ${matchList?.length}`, 'Yorumlar', '1', 'X', '2', 'Alt', 'Üst', 'H1', '1', 'X', '2', 'H2', '1-X', '1-2', 'X-2', 'Var', 'Yok', '+99'].map(
                                                (text, id) => (
                                                    <th key={id}>{text}</th>
                                                )
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {visibleMatches.map((item, index) => (
                                            <React.Fragment key={index}>
                                                <tr>
                                                    <td>
                                                        <span>{item.D}</span> <span>{item.LN}</span>
                                                    </td>
                                                    {['Yorumlar', '1', 'X', '2', 'Alt', 'Üst', 'H1', '1', 'X', '2', 'H2', '1-X', '1-2', 'X-2', 'Var', 'Yok', '+99'].map(
                                                        (x, index) => (
                                                            <td key={index}>{x}</td>
                                                        )
                                                    )}
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <b>{item.C}</b> <span>{item.T}</span> <span>{item.N}</span>
                                                    </td>
                                                    <td>
                                                        <span>Yorumlar</span>
                                                    </td>
                                                    {['1', 'X', '2', 'Alt', 'Üst', 'H1', '1', 'X', '2', 'H2', '1-X', '1-2', 'X-2', 'Var', 'Yok', '+99'].map(
                                                        (title, titleIndex) => (
                                                            <td key={titleIndex} className='rate'>
                                                                {Object.values(item.OCG).map((ocgItem) => {
                                                                    const matchItem = Object.values(ocgItem.OC).find((ocItem) => ocItem.N === title);
                                                                    if (matchItem) {
                                                                        let specialOC: any;
                                                                        if (titleIndex === 4) {
                                                                            specialOC = ocgItem.OC['26'];
                                                                        } else if (titleIndex === 3) {
                                                                            specialOC = ocgItem.OC['25'];
                                                                        } else if (titleIndex === 0) {
                                                                            specialOC = ocgItem.OC['0'];
                                                                        } else if (titleIndex === 1) {
                                                                            specialOC = ocgItem.OC['1'];
                                                                        } else if (titleIndex === 10) {
                                                                            specialOC = ocgItem.OC['3'];
                                                                        } else if (titleIndex === 11) {
                                                                            specialOC = ocgItem.OC['4'];
                                                                        } else if (titleIndex === 12) {
                                                                            specialOC = ocgItem.OC['5'];
                                                                        }
                                                                        if (specialOC) {
                                                                            return (
                                                                                <span
                                                                                    key={specialOC.ID}
                                                                                    onClick={() => addSelectedMatch({
                                                                                        rate: Number(specialOC.O),
                                                                                        mbs: specialOC.MBS!,
                                                                                        matchInfo: { C: item.C, N: item.N }
                                                                                    }, { C: item.C, N: item.N })}
                                                                                    className={selectedMatch.some((selectMatch) => selectMatch.rate === Number(specialOC.O) && selectMatch.matchInfo.C === item.C && selectMatch.matchInfo.N === item.N) ? 'selected' : ''}
                                                                                    style={{ cursor: 'pointer' }}
                                                                                >
                                                                                    {specialOC.O.toString()}
                                                                                </span>
                                                                            );
                                                                        }
                                                                    }
                                                                    return null;
                                                                })}
                                                            </td>
                                                        )
                                                    )}
                                                </tr>
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </Table>
                            </>
                        )}
                    </div>
                    <CouponDetail />
                </>
            }
        </>
    )
}

export default MatchList;
import "./style.scss"
import { useMatchContext } from '../MatchContext';

const CouponDetail = () => {
    const { selectedMatch, totalMatchResult } = useMatchContext();

    return (
        <div className="coupon-detail">
            {selectedMatch.map((selectedMatch: any, index: any) => (
                <div className="item" key={index}>
                    <span>{selectedMatch.mbs}</span>
                    <span>Kod: {selectedMatch.matchInfo.C}</span>
                    <span>Maç: {selectedMatch.matchInfo.N}</span>
                    <strong>Oran: {selectedMatch.rate}</strong>
                </div>
            ))}
            <div className="total">
                <span>Toplam Tutar: {totalMatchResult} TL</span>
            </div>
        </div>
    );
};

export default CouponDetail;

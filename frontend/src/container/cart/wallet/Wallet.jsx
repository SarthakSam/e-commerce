import styles from './Wallet.module.css';

export function Wallet({ total, discount }) {
    return (
        <div className={ styles.wallet }>
            <h3>Order Details</h3>
            <section className={ styles.walletInfo }>
                <span>Cart total</span>
                <span className={ styles.amountDetails }>Rs { total } </span>
            </section>
            <section className={ styles.walletInfo }>
                <span>Cart discount</span>
                <span className={ styles.amountDetails }>Rs { discount } </span>
            </section>
            <section className={ styles.walletInfo }>
                <strong>Total amount</strong>
                <strong className={ styles.amountDetails }>Rs { total - discount } </strong>
            </section>
        </div>
    )
}
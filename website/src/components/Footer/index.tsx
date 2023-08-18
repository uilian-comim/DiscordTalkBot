export function Footer() {
    const date = new Date().getFullYear();
    return (
        <footer className="footer footer-center p-4 bg-base-200 text-base-content fixed bottom-0 left-0">
            <div>
                <p>Copyright © {date} - All right reserved by Uilian Comim</p>
            </div>
        </footer>
    );
}

import type React from "react"

const Card = ({ children, className } : { children : React.ReactNode, className?: string }) => {
    return (
        <div className={`p-8 bg-white border border-gray-200 rounded-xl hover:border-emerald-200 hover:shadow-sm transition-all duration-300 shadow-md ${className}`}>
            {children}
        </div>
    )
}

export default Card
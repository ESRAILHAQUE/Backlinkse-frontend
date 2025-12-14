"use client"

export default function PendingApprovalPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4 py-12">
            <div className="max-w-md w-full bg-background border border-border rounded-xl p-8 shadow-sm text-center space-y-4">
                <h1 className="text-2xl font-bold">Awaiting Admin Approval</h1>
                <p className="text-muted-foreground">
                    Thanks for signing up! Your account is pending admin verification. You’ll get access as soon as it’s
                    approved.
                </p>
                <p className="text-sm text-muted-foreground">
                    If you need expedited approval, please reach out to support@backlinkse.com.
                </p>
            </div>
        </div>
    )
}



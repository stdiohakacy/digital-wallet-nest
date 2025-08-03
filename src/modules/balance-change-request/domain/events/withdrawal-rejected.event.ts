import { BaseDomainEvent, DomainEventProps } from "../../../../libs/domain";

export class WithdrawalRejectedDomainEvent extends BaseDomainEvent {
    readonly requestId: string
    readonly rejectedBy: string;
    readonly rejectedAt: Date;
    readonly reason?: string
    
    public get eventName(): string {
        return 'WithdrawalRejected';
    }

    constructor(props: DomainEventProps<WithdrawalRejectedDomainEvent>) {
        super(props);
        this.requestId = props.aggregateId;
        this.rejectedBy = props.rejectedBy;
        this.rejectedAt = props.rejectedAt;
        this.reason = props.reason;
    }
}

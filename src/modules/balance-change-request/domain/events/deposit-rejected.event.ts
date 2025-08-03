import { BaseDomainEvent, DomainEventProps } from "../../../../libs/domain";

export class DepositRejectedDomainEvent extends BaseDomainEvent {
    readonly requestId: string
    readonly rejectedBy: string;
    readonly rejectedAt: Date;
    readonly reason?: string
    
    public get eventName(): string {
        return 'DepositRejected';
    }

    constructor(props: DomainEventProps<DepositRejectedDomainEvent>) {
        super(props);
        this.requestId = props.aggregateId;
        this.rejectedBy = props.rejectedBy;
        this.rejectedAt = props.rejectedAt;
        this.reason = props.reason;
    }
}

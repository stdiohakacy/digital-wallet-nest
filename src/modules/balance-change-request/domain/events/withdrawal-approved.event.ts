import { BaseDomainEvent, DomainEventProps } from "../../../../libs/domain";

export class WithdrawalApprovedDomainEvent extends BaseDomainEvent {
    readonly requestId: string
    readonly approvedBy: string;
    readonly approvedAt: Date;
    
    public get eventName(): string {
        return 'WithdrawalApproved';
    }

    constructor(props: DomainEventProps<WithdrawalApprovedDomainEvent>) {
        super(props);
        this.requestId = props.aggregateId;
        this.approvedBy = props.approvedBy;
        this.approvedAt = props.approvedAt;
    }
}

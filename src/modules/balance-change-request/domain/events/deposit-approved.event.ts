import { BaseDomainEvent, DomainEventProps } from "../../../../libs/domain";

export class DepositApprovedDomainEvent extends BaseDomainEvent {
    readonly requestId: string
    readonly approvedBy: string;
    readonly approvedAt: Date;
    
    public get eventName(): string {
        return 'DepositApproved';
    }

    constructor(props: DomainEventProps<DepositApprovedDomainEvent>) {
        super(props);
        this.requestId = props.aggregateId;
        this.approvedBy = props.approvedBy;
        this.approvedAt = props.approvedAt;
    }
}

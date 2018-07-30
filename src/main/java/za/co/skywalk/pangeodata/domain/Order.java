package za.co.skywalk.pangeodata.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Order.
 */
@Document(collection = "order")
public class Order implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("files")
    private String files;

    @Field("req_inputs")
    private String reqInputs;

    @Field("req_form_inputs")
    private String reqFormInputs;

    @Field("product")
    private String product;

    @Field("transaction")
    private String transaction;

    @Field("user")
    private String user;

    @Field("status")
    private String status;

    @Field("reject_reason")
    private String rejectReason;

    @Field("company")
    private String company;

    @Field("partner")
    private String partner;

    @Field("country")
    private String country;

    @Field("created_at")
    private String createdAt;

    @Field("updated_at")
    private String updatedAt;

    @Field("expected_date")
    private String expectedDate;

    @Field("day_till_complete")
    private String dayTillComplete;

    @Field("cost")
    private String cost;

    @Field("turn_around_time")
    private String turnAroundTime;

    @Field("report")
    private String report;

    @Field("referenece_id")
    private String refereneceId;

    @Field("cancellation_reason")
    private String cancellationReason;

    @Field("client_id")
    private String clientId;

    @Field("active")
    private String active;

    @Field("selected")
    private String selected;

    @Field("application_id")
    private String applicationId;

    @Field("application_service_ids")
    private String applicationServiceIds;

    @Field("i_cover_report")
    private String iCoverReport;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFiles() {
        return files;
    }

    public Order files(String files) {
        this.files = files;
        return this;
    }

    public void setFiles(String files) {
        this.files = files;
    }

    public String getReqInputs() {
        return reqInputs;
    }

    public Order reqInputs(String reqInputs) {
        this.reqInputs = reqInputs;
        return this;
    }

    public void setReqInputs(String reqInputs) {
        this.reqInputs = reqInputs;
    }

    public String getReqFormInputs() {
        return reqFormInputs;
    }

    public Order reqFormInputs(String reqFormInputs) {
        this.reqFormInputs = reqFormInputs;
        return this;
    }

    public void setReqFormInputs(String reqFormInputs) {
        this.reqFormInputs = reqFormInputs;
    }

    public String getProduct() {
        return product;
    }

    public Order product(String product) {
        this.product = product;
        return this;
    }

    public void setProduct(String product) {
        this.product = product;
    }

    public String getTransaction() {
        return transaction;
    }

    public Order transaction(String transaction) {
        this.transaction = transaction;
        return this;
    }

    public void setTransaction(String transaction) {
        this.transaction = transaction;
    }

    public String getUser() {
        return user;
    }

    public Order user(String user) {
        this.user = user;
        return this;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getStatus() {
        return status;
    }

    public Order status(String status) {
        this.status = status;
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getRejectReason() {
        return rejectReason;
    }

    public Order rejectReason(String rejectReason) {
        this.rejectReason = rejectReason;
        return this;
    }

    public void setRejectReason(String rejectReason) {
        this.rejectReason = rejectReason;
    }

    public String getCompany() {
        return company;
    }

    public Order company(String company) {
        this.company = company;
        return this;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getPartner() {
        return partner;
    }

    public Order partner(String partner) {
        this.partner = partner;
        return this;
    }

    public void setPartner(String partner) {
        this.partner = partner;
    }

    public String getCountry() {
        return country;
    }

    public Order country(String country) {
        this.country = country;
        return this;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public Order createdAt(String createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getUpdatedAt() {
        return updatedAt;
    }

    public Order updatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getExpectedDate() {
        return expectedDate;
    }

    public Order expectedDate(String expectedDate) {
        this.expectedDate = expectedDate;
        return this;
    }

    public void setExpectedDate(String expectedDate) {
        this.expectedDate = expectedDate;
    }

    public String getDayTillComplete() {
        return dayTillComplete;
    }

    public Order dayTillComplete(String dayTillComplete) {
        this.dayTillComplete = dayTillComplete;
        return this;
    }

    public void setDayTillComplete(String dayTillComplete) {
        this.dayTillComplete = dayTillComplete;
    }

    public String getCost() {
        return cost;
    }

    public Order cost(String cost) {
        this.cost = cost;
        return this;
    }

    public void setCost(String cost) {
        this.cost = cost;
    }

    public String getTurnAroundTime() {
        return turnAroundTime;
    }

    public Order turnAroundTime(String turnAroundTime) {
        this.turnAroundTime = turnAroundTime;
        return this;
    }

    public void setTurnAroundTime(String turnAroundTime) {
        this.turnAroundTime = turnAroundTime;
    }

    public String getReport() {
        return report;
    }

    public Order report(String report) {
        this.report = report;
        return this;
    }

    public void setReport(String report) {
        this.report = report;
    }

    public String getRefereneceId() {
        return refereneceId;
    }

    public Order refereneceId(String refereneceId) {
        this.refereneceId = refereneceId;
        return this;
    }

    public void setRefereneceId(String refereneceId) {
        this.refereneceId = refereneceId;
    }

    public String getCancellationReason() {
        return cancellationReason;
    }

    public Order cancellationReason(String cancellationReason) {
        this.cancellationReason = cancellationReason;
        return this;
    }

    public void setCancellationReason(String cancellationReason) {
        this.cancellationReason = cancellationReason;
    }

    public String getClientId() {
        return clientId;
    }

    public Order clientId(String clientId) {
        this.clientId = clientId;
        return this;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getActive() {
        return active;
    }

    public Order active(String active) {
        this.active = active;
        return this;
    }

    public void setActive(String active) {
        this.active = active;
    }

    public String getSelected() {
        return selected;
    }

    public Order selected(String selected) {
        this.selected = selected;
        return this;
    }

    public void setSelected(String selected) {
        this.selected = selected;
    }

    public String getApplicationId() {
        return applicationId;
    }

    public Order applicationId(String applicationId) {
        this.applicationId = applicationId;
        return this;
    }

    public void setApplicationId(String applicationId) {
        this.applicationId = applicationId;
    }

    public String getApplicationServiceIds() {
        return applicationServiceIds;
    }

    public Order applicationServiceIds(String applicationServiceIds) {
        this.applicationServiceIds = applicationServiceIds;
        return this;
    }

    public void setApplicationServiceIds(String applicationServiceIds) {
        this.applicationServiceIds = applicationServiceIds;
    }

    public String getiCoverReport() {
        return iCoverReport;
    }

    public Order iCoverReport(String iCoverReport) {
        this.iCoverReport = iCoverReport;
        return this;
    }

    public void setiCoverReport(String iCoverReport) {
        this.iCoverReport = iCoverReport;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Order order = (Order) o;
        if (order.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), order.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Order{" +
            "id=" + getId() +
            ", files='" + getFiles() + "'" +
            ", reqInputs='" + getReqInputs() + "'" +
            ", reqFormInputs='" + getReqFormInputs() + "'" +
            ", product='" + getProduct() + "'" +
            ", transaction='" + getTransaction() + "'" +
            ", user='" + getUser() + "'" +
            ", status='" + getStatus() + "'" +
            ", rejectReason='" + getRejectReason() + "'" +
            ", company='" + getCompany() + "'" +
            ", partner='" + getPartner() + "'" +
            ", country='" + getCountry() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            ", expectedDate='" + getExpectedDate() + "'" +
            ", dayTillComplete='" + getDayTillComplete() + "'" +
            ", cost='" + getCost() + "'" +
            ", turnAroundTime='" + getTurnAroundTime() + "'" +
            ", report='" + getReport() + "'" +
            ", refereneceId='" + getRefereneceId() + "'" +
            ", cancellationReason='" + getCancellationReason() + "'" +
            ", clientId='" + getClientId() + "'" +
            ", active='" + getActive() + "'" +
            ", selected='" + getSelected() + "'" +
            ", applicationId='" + getApplicationId() + "'" +
            ", applicationServiceIds='" + getApplicationServiceIds() + "'" +
            ", iCoverReport='" + getiCoverReport() + "'" +
            "}";
    }
}

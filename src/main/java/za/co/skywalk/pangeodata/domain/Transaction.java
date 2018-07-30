package za.co.skywalk.pangeodata.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Transaction.
 */
@Document(collection = "transaction")
public class Transaction implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("generalnformation")
    private String generalnformation;

    @Field("addesses")
    private String addesses;

    @Field("status")
    private String status;

    @Field("status_display")
    private String statusDisplay;

    @Field("editable")
    private String editable;

    @Field("edit_mode")
    private String editMode;

    @Field("active")
    private String active;

    @Field("cost")
    private String cost;

    @Field("reference_id")
    private String referenceId;

    @Field("user")
    private String user;

    @Field("company")
    private String company;

    @Field("created_at")
    private String createdAt;

    @Field("status_nr")
    private String statusNr;

    @Field("redirect_url")
    private String redirectUrl;

    @Field("consent_form")
    private String consentForm;

    @Field("local_consent_form")
    private String localConsentForm;

    @Field("valid")
    private String valid;

    @Field("updated_at")
    private String updatedAt;

    @Field("orders")
    private String orders;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getGeneralnformation() {
        return generalnformation;
    }

    public Transaction generalnformation(String generalnformation) {
        this.generalnformation = generalnformation;
        return this;
    }

    public void setGeneralnformation(String generalnformation) {
        this.generalnformation = generalnformation;
    }

    public String getAddesses() {
        return addesses;
    }

    public Transaction addesses(String addesses) {
        this.addesses = addesses;
        return this;
    }

    public void setAddesses(String addesses) {
        this.addesses = addesses;
    }

    public String getStatus() {
        return status;
    }

    public Transaction status(String status) {
        this.status = status;
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getStatusDisplay() {
        return statusDisplay;
    }

    public Transaction statusDisplay(String statusDisplay) {
        this.statusDisplay = statusDisplay;
        return this;
    }

    public void setStatusDisplay(String statusDisplay) {
        this.statusDisplay = statusDisplay;
    }

    public String getEditable() {
        return editable;
    }

    public Transaction editable(String editable) {
        this.editable = editable;
        return this;
    }

    public void setEditable(String editable) {
        this.editable = editable;
    }

    public String getEditMode() {
        return editMode;
    }

    public Transaction editMode(String editMode) {
        this.editMode = editMode;
        return this;
    }

    public void setEditMode(String editMode) {
        this.editMode = editMode;
    }

    public String getActive() {
        return active;
    }

    public Transaction active(String active) {
        this.active = active;
        return this;
    }

    public void setActive(String active) {
        this.active = active;
    }

    public String getCost() {
        return cost;
    }

    public Transaction cost(String cost) {
        this.cost = cost;
        return this;
    }

    public void setCost(String cost) {
        this.cost = cost;
    }

    public String getReferenceId() {
        return referenceId;
    }

    public Transaction referenceId(String referenceId) {
        this.referenceId = referenceId;
        return this;
    }

    public void setReferenceId(String referenceId) {
        this.referenceId = referenceId;
    }

    public String getUser() {
        return user;
    }

    public Transaction user(String user) {
        this.user = user;
        return this;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getCompany() {
        return company;
    }

    public Transaction company(String company) {
        this.company = company;
        return this;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public Transaction createdAt(String createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getStatusNr() {
        return statusNr;
    }

    public Transaction statusNr(String statusNr) {
        this.statusNr = statusNr;
        return this;
    }

    public void setStatusNr(String statusNr) {
        this.statusNr = statusNr;
    }

    public String getRedirectUrl() {
        return redirectUrl;
    }

    public Transaction redirectUrl(String redirectUrl) {
        this.redirectUrl = redirectUrl;
        return this;
    }

    public void setRedirectUrl(String redirectUrl) {
        this.redirectUrl = redirectUrl;
    }

    public String getConsentForm() {
        return consentForm;
    }

    public Transaction consentForm(String consentForm) {
        this.consentForm = consentForm;
        return this;
    }

    public void setConsentForm(String consentForm) {
        this.consentForm = consentForm;
    }

    public String getLocalConsentForm() {
        return localConsentForm;
    }

    public Transaction localConsentForm(String localConsentForm) {
        this.localConsentForm = localConsentForm;
        return this;
    }

    public void setLocalConsentForm(String localConsentForm) {
        this.localConsentForm = localConsentForm;
    }

    public String getValid() {
        return valid;
    }

    public Transaction valid(String valid) {
        this.valid = valid;
        return this;
    }

    public void setValid(String valid) {
        this.valid = valid;
    }

    public String getUpdatedAt() {
        return updatedAt;
    }

    public Transaction updatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getOrders() {
        return orders;
    }

    public Transaction orders(String orders) {
        this.orders = orders;
        return this;
    }

    public void setOrders(String orders) {
        this.orders = orders;
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
        Transaction transaction = (Transaction) o;
        if (transaction.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), transaction.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Transaction{" +
            "id=" + getId() +
            ", generalnformation='" + getGeneralnformation() + "'" +
            ", addesses='" + getAddesses() + "'" +
            ", status='" + getStatus() + "'" +
            ", statusDisplay='" + getStatusDisplay() + "'" +
            ", editable='" + getEditable() + "'" +
            ", editMode='" + getEditMode() + "'" +
            ", active='" + getActive() + "'" +
            ", cost='" + getCost() + "'" +
            ", referenceId='" + getReferenceId() + "'" +
            ", user='" + getUser() + "'" +
            ", company='" + getCompany() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", statusNr='" + getStatusNr() + "'" +
            ", redirectUrl='" + getRedirectUrl() + "'" +
            ", consentForm='" + getConsentForm() + "'" +
            ", localConsentForm='" + getLocalConsentForm() + "'" +
            ", valid='" + getValid() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            ", orders='" + getOrders() + "'" +
            "}";
    }
}

package za.co.skywalk.pangeodata.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Objects;

/**
 * A OrderEmploymentForm.
 */
@Document(collection = "order_employment_form")
public class OrderEmploymentForm implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("employer_name")
    private String employerName;

    @Field("manager_name")
    private String managerName;

    @Field("ending_pay")
    private String endingPay;

    @Field("rehire_eligibility")
    private String rehireEligibility;

    @Field("institution_local_name")
    private String institutionLocalName;

    @Field("source_website")
    private String sourceWebsite;

    @Field("source_phone")
    private String sourcePhone;

    @Field("source_email")
    private String sourceEmail;

    @Field("present")
    private String present;

    @Field("employment_start_date")
    private String employmentStartDate;

    @Field("employment_end_date")
    private String employmentEndDate;

    @Field("ending_position")
    private String endingPosition;

    @Field("starting_position")
    private String startingPosition;

    @Field("starting_pay")
    private String startingPay;

    @Field("street")
    private String street;

    @Field("postal_code")
    private String postalCode;

    @Field("reason_for_leaving")
    private String reasonForLeaving;

    @Field("notes")
    private String notes;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmployerName() {
        return employerName;
    }

    public OrderEmploymentForm employerName(String employerName) {
        this.employerName = employerName;
        return this;
    }

    public void setEmployerName(String employerName) {
        this.employerName = employerName;
    }

    public String getManagerName() {
        return managerName;
    }

    public OrderEmploymentForm managerName(String managerName) {
        this.managerName = managerName;
        return this;
    }

    public void setManagerName(String managerName) {
        this.managerName = managerName;
    }

    public String getEndingPay() {
        return endingPay;
    }

    public OrderEmploymentForm endingPay(String endingPay) {
        this.endingPay = endingPay;
        return this;
    }

    public void setEndingPay(String endingPay) {
        this.endingPay = endingPay;
    }

    public String getRehireEligibility() {
        return rehireEligibility;
    }

    public OrderEmploymentForm rehireEligibility(String rehireEligibility) {
        this.rehireEligibility = rehireEligibility;
        return this;
    }

    public void setRehireEligibility(String rehireEligibility) {
        this.rehireEligibility = rehireEligibility;
    }

    public String getInstitutionLocalName() {
        return institutionLocalName;
    }

    public OrderEmploymentForm institutionLocalName(String institutionLocalName) {
        this.institutionLocalName = institutionLocalName;
        return this;
    }

    public void setInstitutionLocalName(String institutionLocalName) {
        this.institutionLocalName = institutionLocalName;
    }

    public String getSourceWebsite() {
        return sourceWebsite;
    }

    public OrderEmploymentForm sourceWebsite(String sourceWebsite) {
        this.sourceWebsite = sourceWebsite;
        return this;
    }

    public void setSourceWebsite(String sourceWebsite) {
        this.sourceWebsite = sourceWebsite;
    }

    public String getSourcePhone() {
        return sourcePhone;
    }

    public OrderEmploymentForm sourcePhone(String sourcePhone) {
        this.sourcePhone = sourcePhone;
        return this;
    }

    public void setSourcePhone(String sourcePhone) {
        this.sourcePhone = sourcePhone;
    }

    public String getSourceEmail() {
        return sourceEmail;
    }

    public OrderEmploymentForm sourceEmail(String sourceEmail) {
        this.sourceEmail = sourceEmail;
        return this;
    }

    public void setSourceEmail(String sourceEmail) {
        this.sourceEmail = sourceEmail;
    }

    public String getPresent() {
        return present;
    }

    public OrderEmploymentForm present(String present) {
        this.present = present;
        return this;
    }

    public void setPresent(String present) {
        this.present = present;
    }

    public String getEmploymentStartDate() {
        return employmentStartDate;
    }

    public OrderEmploymentForm employmentStartDate(String employmentStartDate) {
        this.employmentStartDate = employmentStartDate;
        return this;
    }

    public void setEmploymentStartDate(String employmentStartDate) {
        this.employmentStartDate = employmentStartDate;
    }

    public String getEmploymentEndDate() {
        return employmentEndDate;
    }

    public OrderEmploymentForm employmentEndDate(String employmentEndDate) {
        this.employmentEndDate = employmentEndDate;
        return this;
    }

    public void setEmploymentEndDate(String employmentEndDate) {
        this.employmentEndDate = employmentEndDate;
    }

    public String getEndingPosition() {
        return endingPosition;
    }

    public OrderEmploymentForm endingPosition(String endingPosition) {
        this.endingPosition = endingPosition;
        return this;
    }

    public void setEndingPosition(String endingPosition) {
        this.endingPosition = endingPosition;
    }

    public String getStartingPosition() {
        return startingPosition;
    }

    public OrderEmploymentForm startingPosition(String startingPosition) {
        this.startingPosition = startingPosition;
        return this;
    }

    public void setStartingPosition(String startingPosition) {
        this.startingPosition = startingPosition;
    }

    public String getStartingPay() {
        return startingPay;
    }

    public OrderEmploymentForm startingPay(String startingPay) {
        this.startingPay = startingPay;
        return this;
    }

    public void setStartingPay(String startingPay) {
        this.startingPay = startingPay;
    }

    public String getStreet() {
        return street;
    }

    public OrderEmploymentForm street(String street) {
        this.street = street;
        return this;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public OrderEmploymentForm postalCode(String postalCode) {
        this.postalCode = postalCode;
        return this;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getReasonForLeaving() {
        return reasonForLeaving;
    }

    public OrderEmploymentForm reasonForLeaving(String reasonForLeaving) {
        this.reasonForLeaving = reasonForLeaving;
        return this;
    }

    public void setReasonForLeaving(String reasonForLeaving) {
        this.reasonForLeaving = reasonForLeaving;
    }

    public String getNotes() {
        return notes;
    }

    public OrderEmploymentForm notes(String notes) {
        this.notes = notes;
        return this;
    }

    public void setNotes(String notes) {
        this.notes = notes;
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
        OrderEmploymentForm orderEmploymentForm = (OrderEmploymentForm) o;
        if (orderEmploymentForm.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), orderEmploymentForm.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OrderEmploymentForm{" +
            "id=" + getId() +
            ", employerName='" + getEmployerName() + "'" +
            ", managerName='" + getManagerName() + "'" +
            ", endingPay='" + getEndingPay() + "'" +
            ", rehireEligibility='" + getRehireEligibility() + "'" +
            ", institutionLocalName='" + getInstitutionLocalName() + "'" +
            ", sourceWebsite='" + getSourceWebsite() + "'" +
            ", sourcePhone='" + getSourcePhone() + "'" +
            ", sourceEmail='" + getSourceEmail() + "'" +
            ", present='" + getPresent() + "'" +
            ", employmentStartDate='" + getEmploymentStartDate() + "'" +
            ", employmentEndDate='" + getEmploymentEndDate() + "'" +
            ", endingPosition='" + getEndingPosition() + "'" +
            ", startingPosition='" + getStartingPosition() + "'" +
            ", startingPay='" + getStartingPay() + "'" +
            ", street='" + getStreet() + "'" +
            ", postalCode='" + getPostalCode() + "'" +
            ", reasonForLeaving='" + getReasonForLeaving() + "'" +
            ", notes='" + getNotes() + "'" +
            "}";
    }
}

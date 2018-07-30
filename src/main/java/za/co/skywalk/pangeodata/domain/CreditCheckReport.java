package za.co.skywalk.pangeodata.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Objects;

/**
 * A CreditCheckReport.
 */
@Document(collection = "credit_check_report")
public class CreditCheckReport implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("credit_findings")
    private String creditFindings;

    @Field("credit_verified_by")
    private String creditVerifiedBy;

    @Field("credit_verified_date")
    private String creditVerifiedDate;

    @Field("credit_remarks")
    private String creditRemarks;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCreditFindings() {
        return creditFindings;
    }

    public CreditCheckReport creditFindings(String creditFindings) {
        this.creditFindings = creditFindings;
        return this;
    }

    public void setCreditFindings(String creditFindings) {
        this.creditFindings = creditFindings;
    }

    public String getCreditVerifiedBy() {
        return creditVerifiedBy;
    }

    public CreditCheckReport creditVerifiedBy(String creditVerifiedBy) {
        this.creditVerifiedBy = creditVerifiedBy;
        return this;
    }

    public void setCreditVerifiedBy(String creditVerifiedBy) {
        this.creditVerifiedBy = creditVerifiedBy;
    }

    public String getCreditVerifiedDate() {
        return creditVerifiedDate;
    }

    public CreditCheckReport creditVerifiedDate(String creditVerifiedDate) {
        this.creditVerifiedDate = creditVerifiedDate;
        return this;
    }

    public void setCreditVerifiedDate(String creditVerifiedDate) {
        this.creditVerifiedDate = creditVerifiedDate;
    }

    public String getCreditRemarks() {
        return creditRemarks;
    }

    public CreditCheckReport creditRemarks(String creditRemarks) {
        this.creditRemarks = creditRemarks;
        return this;
    }

    public void setCreditRemarks(String creditRemarks) {
        this.creditRemarks = creditRemarks;
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
        CreditCheckReport creditCheckReport = (CreditCheckReport) o;
        if (creditCheckReport.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), creditCheckReport.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CreditCheckReport{" +
            "id=" + getId() +
            ", creditFindings='" + getCreditFindings() + "'" +
            ", creditVerifiedBy='" + getCreditVerifiedBy() + "'" +
            ", creditVerifiedDate='" + getCreditVerifiedDate() + "'" +
            ", creditRemarks='" + getCreditRemarks() + "'" +
            "}";
    }
}

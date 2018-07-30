package za.co.skywalk.pangeodata.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Objects;

/**
 * A BankruptcyCheckReport.
 */
@Document(collection = "bankruptcy_check_report")
public class BankruptcyCheckReport implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("bankruptcy_findings")
    private String bankruptcyFindings;

    @Field("bankruptcy_verified_by")
    private String bankruptcyVerifiedBy;

    @Field("bankruptcy_verified_date")
    private String bankruptcyVerifiedDate;

    @Field("bankruptcy_remarks")
    private String bankruptcyRemarks;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getBankruptcyFindings() {
        return bankruptcyFindings;
    }

    public BankruptcyCheckReport bankruptcyFindings(String bankruptcyFindings) {
        this.bankruptcyFindings = bankruptcyFindings;
        return this;
    }

    public void setBankruptcyFindings(String bankruptcyFindings) {
        this.bankruptcyFindings = bankruptcyFindings;
    }

    public String getBankruptcyVerifiedBy() {
        return bankruptcyVerifiedBy;
    }

    public BankruptcyCheckReport bankruptcyVerifiedBy(String bankruptcyVerifiedBy) {
        this.bankruptcyVerifiedBy = bankruptcyVerifiedBy;
        return this;
    }

    public void setBankruptcyVerifiedBy(String bankruptcyVerifiedBy) {
        this.bankruptcyVerifiedBy = bankruptcyVerifiedBy;
    }

    public String getBankruptcyVerifiedDate() {
        return bankruptcyVerifiedDate;
    }

    public BankruptcyCheckReport bankruptcyVerifiedDate(String bankruptcyVerifiedDate) {
        this.bankruptcyVerifiedDate = bankruptcyVerifiedDate;
        return this;
    }

    public void setBankruptcyVerifiedDate(String bankruptcyVerifiedDate) {
        this.bankruptcyVerifiedDate = bankruptcyVerifiedDate;
    }

    public String getBankruptcyRemarks() {
        return bankruptcyRemarks;
    }

    public BankruptcyCheckReport bankruptcyRemarks(String bankruptcyRemarks) {
        this.bankruptcyRemarks = bankruptcyRemarks;
        return this;
    }

    public void setBankruptcyRemarks(String bankruptcyRemarks) {
        this.bankruptcyRemarks = bankruptcyRemarks;
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
        BankruptcyCheckReport bankruptcyCheckReport = (BankruptcyCheckReport) o;
        if (bankruptcyCheckReport.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bankruptcyCheckReport.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BankruptcyCheckReport{" +
            "id=" + getId() +
            ", bankruptcyFindings='" + getBankruptcyFindings() + "'" +
            ", bankruptcyVerifiedBy='" + getBankruptcyVerifiedBy() + "'" +
            ", bankruptcyVerifiedDate='" + getBankruptcyVerifiedDate() + "'" +
            ", bankruptcyRemarks='" + getBankruptcyRemarks() + "'" +
            "}";
    }
}

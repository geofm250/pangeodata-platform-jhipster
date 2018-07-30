package za.co.skywalk.pangeodata.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DefaultReport.
 */
@Document(collection = "default_report")
public class DefaultReport implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("verified_by")
    private String verifiedBy;

    @Field("findings")
    private String findings;

    @Field("verified_date")
    private String verifiedDate;

    @Field("remarks")
    private String remarks;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getVerifiedBy() {
        return verifiedBy;
    }

    public DefaultReport verifiedBy(String verifiedBy) {
        this.verifiedBy = verifiedBy;
        return this;
    }

    public void setVerifiedBy(String verifiedBy) {
        this.verifiedBy = verifiedBy;
    }

    public String getFindings() {
        return findings;
    }

    public DefaultReport findings(String findings) {
        this.findings = findings;
        return this;
    }

    public void setFindings(String findings) {
        this.findings = findings;
    }

    public String getVerifiedDate() {
        return verifiedDate;
    }

    public DefaultReport verifiedDate(String verifiedDate) {
        this.verifiedDate = verifiedDate;
        return this;
    }

    public void setVerifiedDate(String verifiedDate) {
        this.verifiedDate = verifiedDate;
    }

    public String getRemarks() {
        return remarks;
    }

    public DefaultReport remarks(String remarks) {
        this.remarks = remarks;
        return this;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
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
        DefaultReport defaultReport = (DefaultReport) o;
        if (defaultReport.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), defaultReport.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DefaultReport{" +
            "id=" + getId() +
            ", verifiedBy='" + getVerifiedBy() + "'" +
            ", findings='" + getFindings() + "'" +
            ", verifiedDate='" + getVerifiedDate() + "'" +
            ", remarks='" + getRemarks() + "'" +
            "}";
    }
}
